'use client'

import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

interface GlassmorphismConfig {
  enabled?: boolean
  bgOpacity?: string
  backdropBlur?: string
  borderRadius?: string
  border?: string
  shadow?: string
  padding?: string
}

export const GlassMorphHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  title,
  titleClasses,
  subtitle,
  subtitleClasses,
  richTextClasses,
  glassmorphism,
  mobileSpacing,
}) => {
  // Extract glassmorphism settings with defaults
  const {
    enabled: glassEnabled = true,
    bgOpacity = 'bg-white/75',
    backdropBlur = 'backdrop-blur-md',
    borderRadius = 'rounded-lg',
    border = 'border border-white/20',
    shadow = 'shadow-lg',
    padding = 'p-8',
  } = (glassmorphism as GlassmorphismConfig) || {}

  // Build the glassmorphism class
  const glassClasses = glassEnabled
    ? cn(bgOpacity, backdropBlur, borderRadius, border, shadow, padding)
    : ''

  // Extract mobile spacing classes
  const mobileSpacingClasses = Object.values(mobileSpacing || {})
    .filter(Boolean)
    .join(' ')

  return (
    <div className="relative min-h-[60vh] w-full overflow-hidden">
      {/* Background Image */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 w-full h-full">
          <Media
            imgClassName="w-full h-full object-cover"
            className="w-full h-full object-cover"
            priority
            resource={media}
          />
        </div>
      )}

      {/* Content Container */}
      <div className={cn('container relative py-16', mobileSpacingClasses)}>
        <div className={cn('w-full md:w-[45%]', glassClasses)}>
          <h1 className={cn(titleClasses)}>{title}</h1>
          <p className={cn(subtitleClasses)}>{subtitle}</p>
          {richText && (
            <RichText className={cn(richTextClasses)} data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-wrap gap-4 mt-6">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink
                      className="px-6 py-3 md:px-8 md:py-4 rounded-full md:text-lg"
                      {...link}
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
