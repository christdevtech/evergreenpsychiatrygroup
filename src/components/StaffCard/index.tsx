'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import type { Staff } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '../RichText'
import { Button } from '../ui/button'

export type StaffCardData = Pick<
  Staff,
  'slug' | 'name' | 'position' | 'role' | 'image' | 'description' | 'specialties' | 'locations'
>

export const StaffCard: React.FC<{
  className?: string
  doc?: StaffCardData
  relationTo?: 'staff'
  aspectRatio?: string
  bgColor?: string | null | undefined
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, aspectRatio, bgColor = 'bg-slate-50' } = props

  if (!doc) return null

  const { slug, name, position, role, image, description, specialties, locations } = doc
  const href = `/${relationTo}/${slug}`
  const isLeader = role === 'leader'
  const isProvider = role === 'provider'

  return (
    <article
      className={cn(
        'rounded-2xl overflow-hidden bg-white hover:cursor-pointer shadow-lg pt-8 lg:pt-16',
        className,
        bgColor,
      )}
      ref={card.ref}
    >
      <div className={cn('relative w-[min(80%,400px)] m-auto', aspectRatio || 'aspect-square')}>
        {image && typeof image !== 'string' && (
          <Media
            className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
            resource={image}
            size="33vw"
          />
        )}
      </div>
      <div className="p-8">
        {name && (
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-center">
              <Link className="text-black hover:text-teal-600" href={href} ref={link.ref}>
                {name}
              </Link>
            </h2>
          </div>
        )}
        {position && (
          <div className="mt-8 text-gray-600 text-center md:text-lg lg:text-xl xl:text-2xl">
            <p>{position}</p>
          </div>
        )}

        {isLeader && description ? (
          <div className="mt-4">
            <RichText
              data={description}
              enableGutter={false}
              className="line-clamp-4 text-base md:text-lg lg:text-xl text-gray-700"
            />
          </div>
        ) : (
          <div className="mt-4 flex justify-between items-start">
            {specialties && specialties.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg text-teal-600 font-medium flex items-center gap-2 md:text-xl lg:text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-stethoscope"
                  >
                    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
                    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path>
                    <circle cx="20" cy="10" r="2"></circle>
                  </svg>
                  Specialty
                </h3>
                <hr className="bg-teal-600 border-teal-600 mb-4 mt-2 h-[2px]" />
                <div className="text-gray-700 text-base md:text-lg lg:text-xl">
                  {specialties.map((specialty, index) => {
                    if (typeof specialty === 'object' && specialty !== null) {
                      return <p key={index}>{specialty.title || 'Unnamed Specialty'}</p>
                    }
                    return null
                  })}
                </div>
              </div>
            )}

            {locations && locations.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg text-teal-600 font-medium flex items-center gap-2 md:text-xl lg:text-2xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
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
                  Locations
                </h3>
                <hr className="bg-teal-600 border-teal-600 mb-4 mt-2 h-[2px]" />
                <div className="text-gray-700 text-end text-base md:text-lg lg:text-xl">
                  {locations.map((location, index) => {
                    if (typeof location === 'object' && location !== null) {
                      return <p key={index}>{location.title || 'Unnamed Location'}</p>
                    }
                    return null
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-between items-center">
          <p className="text-teal-600 font-medium hover:underline text-base md:text-lg lg:text-xl">
            See more
          </p>
          {isProvider && (
            <Button className="bg-teal-600 text-white font-medium">Book session</Button>
          )}
        </div>
      </div>
    </article>
  )
}
