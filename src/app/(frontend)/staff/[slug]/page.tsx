import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React, { cache } from 'react'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function StaffPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/staff/' + slug
  const staff = await queryStaffBySlug({ slug })

  if (!staff) return <PayloadRedirects url={url} />

  const { name, position, image, description, specialties, locations, role } = staff
  const isProvider = role === 'provider'

  return (
    <div className="py-0 md:py-16 lg:py-24">
      <div className="container bg-slate-50 py-8 md:py-12 lg:py-16">
        <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-8 lg:gap-16 md:items-center">
          <div className="w-full md:w-1/2">
            <div className="text-center md:text-left">
              <h4 className="text-teal-600 font-semibold mb-4 text-lg md:text-xl lg:text-2xl">
                About
              </h4>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{name}</h1>
              <p className="text-xl md:text-2xl lg:text-3xl font-light mb-4 md:mb-8">{position}</p>
            </div>

            <div className="flex flex-col gap-4 md:gap-8">
              {specialties && specialties.length > 0 && (
                <div className="flex-1">
                  <h2 className="text-lg text-teal-600 font-bold flex items-center gap-2 md:text-xl lg:text-2xl pb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-stethoscope"
                    >
                      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                      <circle cx="20" cy="10" r="2"></circle>
                    </svg>
                    Specialty
                  </h2>

                  <div className="text-gray-700">
                    {specialties.map((specialty, index) => {
                      if (typeof specialty === 'object' && specialty !== null) {
                        return (
                          <div
                            key={index}
                            className="text-lg md:text-xl lg:text-2xl font-semibold flex items-center gap-4"
                          >
                            <div className="h-2 w-2 rounded-full bg-teal-600"></div>{' '}
                            {specialty.title || 'Unnamed Specialty'}
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              )}

              {locations && locations.length > 0 && (
                <div className="mb-8 flex items-center gap-2 flex-wrap md:flex-nowrap">
                  <Button className="text-lg bg-teal-600 text-white font-medium flex items-center gap-2 md:text-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-map-pin"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Locations</span>
                  </Button>

                  <p className="text-teal-600 font-semibold text-lg md:text-xl lg:text-2xl">
                    {locations.map((location, index) => {
                      if (typeof location === 'object' && location !== null) {
                        return (
                          <span key={index} className="mb-1">
                            {location.title || 'Unnamed Location'}
                            {index < locations.length - 1 && <span>, </span>}
                          </span>
                        )
                      }
                      return null
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="relative w-[min(100%,400px)] mx-auto mb-8 rounded-full overflow-hidden aspect-square">
              {image && typeof image !== 'string' && (
                <Media
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  resource={image}
                  priority
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          {description ? (
            <div className="text-lg md:text-xl lg:text-2xl max-w-none">
              <RichText data={description} enableGutter={false} enableProse={false} />
            </div>
          ) : (
            <div className="text-lg md:text-xl lg:text-2xl max-w-none">
              <p>
                {name} is a valued member of the Evergreen Psychiatry Group team, bringing expertise
                and compassion to their role as a {position}. With a commitment to patient-centered
                care, they work diligently to create a supportive environment for all patients.
              </p>
            </div>
          )}
          {isProvider && (
            <div className="mt-4">
              <Link href="#book-appointment">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-6 rounded-md text-lg">
                  Book Appointment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const queryStaffBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'staff',
    limit: 1,
    depth: 3,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
