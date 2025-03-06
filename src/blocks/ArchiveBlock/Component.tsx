import type { Post, ArchiveBlock as ArchiveBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// force dynamic
export const dynamic = 'force-dynamic'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    categories,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    title,
    seeMoreLink,
    seeMoreLinkText,
  } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    posts = fetchedPosts.docs
  } else {
    if (selectedDocs?.length) {
      const filteredSelectedPosts = selectedDocs.map((post) => {
        if (typeof post.value === 'object') return post.value
      }) as Post[]

      posts = filteredSelectedPosts
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container text-center mb-16">
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>}
          <RichText
            className="ms-0 max-w-[48rem] m-auto text-lg"
            data={introContent}
            enableGutter={false}
          />
        </div>
      )}
      <CollectionArchive posts={posts} />
      {seeMoreLink && (
        <div className="container text-center mt-16">
          <Button
            asChild
            className={
              'bg-white text-black border-2 border-black hover:bg-black hover:text-white px-10 py-5 text-lg rounded-full'
            }
          >
            <Link href={'/posts'} className="flex items-center gap-2 hover:gap-4 transition-all">
              {seeMoreLinkText} <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
