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
        'relative flex items-center justify-center min-h-[60vh] pt-16 md:py-16 overflow-hidden',
        heroBgGradient?.type,
        heroBgGradient?.fromColor,
        heroBgGradient?.viaColor,
        heroBgGradient?.toColor,
      )}
    >
      <div className="container relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-[55%]">
          <h1 className={cn(titleClasses)}>{title}</h1>
          <p className={cn(subtitleClasses)}>{subtitle}</p>
          {richText && (
            <RichText className={cn(richTextClasses)} data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center md:justify-start gap-4">
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
        <div className="w-full md:w-[45%] flex items-end justify-center px-8 md:px-16">
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
