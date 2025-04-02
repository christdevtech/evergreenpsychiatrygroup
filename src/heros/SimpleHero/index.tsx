'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export const SimpleHero: React.FC<Page['hero']> = ({ links, media, title, titleClasses }) => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image with aspect ratio */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 w-full h-full">
          <Media
            imgClassName="w-full h-full object-cover"
            className="w-full h-full"
            priority
            resource={media}
          />
        </div>
      )}

      {/* Content Container with aspect ratio */}
      <div className="container relative w-full min-h-[65dvh] lg:min-h-[70dvh]">
        {/* Centered content */}
        <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-4 md:px-8 py-16">
          <div className="text-left">
            {title && (
              <h1 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />
            )}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {links.map(({ link }, i) => {
                  return (
                    <div key={i}>
                      <CMSLink
                        className="px-6 py-3 md:px-8 md:py-4 rounded-full md:text-lg"
                        {...link}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
