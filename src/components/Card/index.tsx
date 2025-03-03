'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  aspectRatio?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, aspectRatio } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'border border-border rounded-lg overflow-hidden bg-teal-600 hover:cursor-pointer',
        className,
      )}
      ref={card.ref}
    >
      <div className={cn('relative w-full', aspectRatio)}>
        {!metaImage && (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">No image</div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media
            className="absolute inset-0 w-full h-full object-cover object-center"
            resource={metaImage}
            size="33vw"
          />
        )}
      </div>
      <div className="p-8 text-white">
        {showCategories && hasCategories && (
          <div className="uppercase text-sm mb-4">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryTitle}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h2>
              <Link className="not-prose" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h2>
          </div>
        )}
        {description && (
          <div className="mt-4 text-lg">{description && <p>{sanitizedDescription}</p>}</div>
        )}
        <div className="mt-12">
          <p className="underline text-lg">Learn more</p>
        </div>
      </div>
    </article>
  )
}
