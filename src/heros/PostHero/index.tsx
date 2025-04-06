// import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import { Post as PostType } from '@/payload-types'

// import { Media } from '@/components/Media'
// import { formatAuthors } from '@/utilities/formatAuthors'
import Link from 'next/link'
import { Button } from '@payloadcms/ui'
import Image from 'next/image'
export const PostHero: React.FC<{
  post: PostType
}> = ({ post }) => {
  const { heroImage, title, meta } = post

  return (
    <div>
      <div className="bg-teal-600 py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:justify-between md:align-center gap-8 lg:gap-16">
            <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-8 md:justify-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold">{title}</h1>
              {meta?.description && (
                <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  {meta?.description}
                </p>
              )}
            </div>

            <div className="relative min-h-[60dvh] rounded-xl overflow-hidden w-full md:w-7/12">
              {heroImage && typeof heroImage === 'object' && (
                <Image
                  src={heroImage.url || ''}
                  alt={heroImage.alt || ''}
                  fill
                  className="object-cover"
                  objectPosition="left center"
                />
                // <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 py-16 mb-8 md:mb-16">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-teal-600 font-semibold text-center md:text-left">
            Ready to see <br className="hidden md:block" /> one of our therapists?
          </h2>
          <Link href="/contact" className="btn btn-primary">
            <Button className="bg-teal-600 text-lg md:text-xl text-white py-6 px-12 rounded-full transition-all duration-300 hover:bg-teal-200 hover:text-slate-900">
              Book an Appointment
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Author</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Date Published</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div> */}
    </div>
  )
}
