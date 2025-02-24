'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  heroBgGradient,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center py-16',
        heroBgGradient?.type,
        heroBgGradient?.fromColor,
        heroBgGradient?.viaColor,
        heroBgGradient?.toColor,
      )}
    >
      <div className="container mb-8 z-10  flex items-center justify-center">
        <div className="md:w-1/2">
          {richText && <RichText className="mb-6" data={richText} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-start gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink className="px-12 py-6 rounded-full text-lg" {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="md:max-h-[40dvh] md:w-1/2 px-16">
          {media && typeof media === 'object' && (
            <Media imgClassName="rounded-2xl" className="object-fit" priority resource={media} />
          )}
        </div>
      </div>
    </div>
  )
}
