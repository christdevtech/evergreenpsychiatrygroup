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
  title,
  titleClasses,
  subtitle,
  subtitleClasses,
  richTextClasses,
}) => {
  return (
    <div
      className={cn(
        'relative flex items-end justify-center min-h-[60vh] overflow-hidden',
        heroBgGradient?.type,
        heroBgGradient?.fromColor,
        heroBgGradient?.viaColor,
        heroBgGradient?.toColor,
      )}
    >
      <div className="container relative flex flex-col lg:flex-row justify-between gap-8">
        <div className="w-full lg:w-[55%] pt-16 md:py-16 lg:py-24 xl:py-32">
          <h1 className={cn(titleClasses, 'text-center lg:text-left')}>{title}</h1>
          <p className={cn(subtitleClasses, 'text-center lg:text-left')}>{subtitle}</p>
          {richText && (
            <RichText
              className={cn(richTextClasses, 'text-center lg:text-left')}
              data={richText}
              enableGutter={false}
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center lg:justify-start gap-4 flex-wrap">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      className="px-8 py-4 md:px-12 md:py-6 rounded-full md:text-lg"
                      {...link}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div className="w-full lg:w-[45%] flex items-end justify-center px-8 md:px-16 self-end">
          {media && typeof media === 'object' && (
            <Media
              imgClassName="rounded-2xl w-full h-full object-contain"
              className="w-full max-h-[500px]"
              priority
              resource={media}
            />
          )}
        </div>
      </div>
    </div>
  )
}
