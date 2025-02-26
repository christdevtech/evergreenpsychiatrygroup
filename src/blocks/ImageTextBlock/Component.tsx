import React from 'react'
import type { ImageTextBlock as ImageTextBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = ImageTextBlockProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const ImageTextBlock: React.FC<Props> = (props) => {
  const {
    image,
    subheading,
    heading,
    description,
    link,
    className,
    disableInnerContainer = false,
  } = props

  return (
    <div className={cn('py-12 md:py-16 xl:py-32', className)}>
      <div className={cn('container', { 'max-w-screen-xl mx-auto': !disableInnerContainer })}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image column with background box desktop only */}
          <div className="relative p-8 hidden lg:block">
            <div className="absolute left-0 top-0 w-[60%] h-[100%] bg-special-400 z-0" />
            <div className="relative z-10">
              {image && typeof image === 'object' && (
                <Media imgClassName="w-full h-auto" resource={image} />
              )}
            </div>
          </div>

          {/* Content column */}
          <div className="flex flex-col gap-4">
            {subheading && (
              <p className="text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-finlandia-600">
                {subheading}
              </p>
            )}
            {heading && <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{heading}</h2>}
            {description && (
              <div className="mt-2">
                <RichText
                  data={description}
                  enableGutter={false}
                  enableProse={false}
                  className="text-base md:text-lg lg:text-xl"
                />
              </div>
            )}
            {link && (
              <div className="mt-4">
                <CMSLink {...link} className="rounded-full bg-slate-900 text-white px-6 py-3" />
              </div>
            )}
          </div>

          {/* Image column with background box mobile only */}
          <div className="relative p-4 block lg:hidden">
            <div className="absolute left-0 top-0 w-[60%] h-[100%] bg-finlandia-500 z-0" />
            <div className="relative z-10">
              {image && typeof image === 'object' && (
                <Media imgClassName="w-full h-auto" resource={image} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
