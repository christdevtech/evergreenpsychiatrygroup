import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@payloadcms/ui'
import PostCTA from '@/components/PostCTA'

export const dynamic = 'force-dynamic'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 3,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <div>
      <PageClient />
      <div className="bg-teal-600 py-16">
        <div className="container">
          <div className="flex flex-col md:flex-row md:justify-between md:align-center gap-8 lg:gap-16">
            <div className="w-full md:w-5/12 flex flex-col gap-4 md:gap-8 md:justify-center">
              <h1 className="text-white text-4xl md:text-6xl font-bold">
                Insights for Your <br className="hidden md:block" /> Mental Wellness
              </h1>
              <p className="text-white text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Explore expert guidance, tips, and resources to support your mental health journey
              </p>
            </div>

            <div className="relative min-h-[60dvh] rounded-xl overflow-hidden w-full md:w-7/12">
              <Image
                src="/assets/resources.png"
                alt="Resources Images"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-teal-50 py-16 mb-8 md:mb-16">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-teal-600 font-semibold">
            Ready to see <br className="hidden md:block" /> one of our therapists?
          </h2>
          <Link href="/contact" className="btn btn-primary">
            <Button className="bg-teal-600 text-lg md:text-xl text-white py-6 px-12 rounded-full transition-all duration-300 hover:bg-teal-200 hover:text-slate-900">
              Book an Appointment
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} className="mb-8 md:mb-16" />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>

      <PostCTA />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Evergreen Psychiatry Group Posts`,
  }
}
