import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  richTextClasses,
  title,
  titleClasses,
}) => {
  return (
    <div className="bg-teal-700 relative pb-24">
      <div className="flex flex-col lg:flex-row gap-16 container py-16">
        <div className="flex-grow mb-8 flex flex-col gap-4 justify-center">
          {title && <h2 className={cn(titleClasses, 'mb-6')}>{title}</h2>}
          {richText && (
            <RichText
              className={cn(richTextClasses, 'mb-6')}
              data={richText}
              enableGutter={false}
            />
          )}
        </div>
        <div className="lg:min-w-[30%] lg:max-w-[30%]">
          {media && typeof media === 'object' && (
            <div className="w-full">
              <Media
                className="rounded-full"
                imgClassName="rounded-full"
                priority
                resource={media}
              />
            </div>
          )}
        </div>
      </div>
      <div className="container flex flex-col lg:flex-row lg:justify-between gap-4 md:rounded-2xl lg:rounded-3xl bg-vistablue-50 py-8 px-4 md:px-16 lg:px-24 items-center absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 shadow-md hover:shadow-lg transition-shadow duration-600">
        <h3 className="text-teal-700 text-center lg:text-left text-2xl md:text-3xl lg:text-4xl font-medium">
          Ready to see <br className="hidden lg:block" /> one of our providers?
        </h3>
        {Array.isArray(links) &&
          links.length > 0 &&
          links.map(({ link, buttonClasses }, i) => {
            return <CMSLink key={i} {...link} className={cn(buttonClasses)} />
          })}
      </div>
    </div>
  )
}
