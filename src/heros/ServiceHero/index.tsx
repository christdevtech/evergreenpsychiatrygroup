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
export const ServiceHero: React.FC<Page['hero']> = ({
  links,
  media,
  title,
  subtitle,
  richText,
  titleClasses,
  subtitleClasses,
  richTextClasses,
  glassmorphism,
  bgColor,
}) => {
  const {
    enabled: glassEnabled = true,
    bgOpacity = 'bg-white/75',
    backdropBlur = 'backdrop-blur-md',
    borderRadius = 'rounded-lg',
    border = 'border border-white/20',
    shadow = 'shadow-lg',
    padding = 'p-8',
  } = (glassmorphism as GlassmorphismConfig) || {}
  return (
    <div className={cn('relative w-full overflow-hidden py-16', bgColor)}>
      {/* Two-column layout */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 2xl:gap-16">
        {/* Left column with full-height image */}
        <div className="relative aspect-square shadow-lg rounded-2xl overflow-clip">
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
          <div
            className={cn(
              'flex flex-col justify-center sm:flex-row sm:justify-between items-center flex-wrap gap-4 absolute bottom-0 left-0 right-0',
              bgOpacity,
              backdropBlur,
              borderRadius,
              border,
              shadow,
              padding,
            )}
          >
            <h3 className="text-white text-center text-base md:text-lg 2xl:text-2xl font-bold">
              Book a Virtual Appointment
            </h3>
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {links.map(({ link, buttonClasses }, i) => {
                  return (
                    <div key={i}>
                      <CMSLink className={cn(buttonClasses)} {...link} />
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right column with content */}
        <div className="flex flex-col justify-center">
          <div className="max-w-xl">
            {title && (
              <h1 className={cn(titleClasses)} dangerouslySetInnerHTML={{ __html: title }} />
            )}

            {subtitle && (
              <h2 className={cn(subtitleClasses)} dangerouslySetInnerHTML={{ __html: subtitle }} />
            )}

            {richText && (
              <RichText className={cn(richTextClasses)} data={richText} enableGutter={false} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
