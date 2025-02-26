import React from 'react'
import type { FullWidthImageText as FullWidthImageTextProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

type Props = FullWidthImageTextProps & {
  className?: string
  disableInnerContainer?: boolean
}

export const FullWidthImageText: React.FC<Props> = (props) => {
  const {
    image,
    heading,
    description,
    backgroundColor = 'bg-finlandia-500',
    textColor = 'text-white',
    link,
    className,
  } = props

  return (
    <div className={cn('container my-16', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-7">
        {/* Image column */}
        <div className="hidden lg:flex justify-center items-center z-10 col-span-1 lg:col-span-3 xl:col-span-4">
          <div className="relative aspect-square xl:aspect-video z-10">
            {image && typeof image === 'object' && (
              <Media
                imgClassName="w-full aspect-square xl:aspect-video object-cover z-10"
                resource={image}
              />
            )}
          </div>
        </div>

        {/* Content column */}
        <div
          className={cn(
            'relative flex flex-col justify-center px-8 py-12 md:px-16 md:py-20 col-span-1 lg:col-span-3',
            textColor,
          )}
        >
          <div
            className={cn(
              'absolute inset-0 left-0 top-0',
              backgroundColor,
              'w-full h-full lg:w-[120%] lg:-left-[20%] z-0',
            )}
          ></div>
          <div className="max-w-xl relative z-10">
            {heading && (
              <h2 className="text-2xl md:text-2xl lg:text-3xl font-semibold mb-6">{heading}</h2>
            )}
            {description && (
              <div className="mb-8">
                <RichText
                  data={description}
                  enableGutter={false}
                  enableProse={false}
                  className="text-base md:text-lg lg:text-xl"
                />
              </div>
            )}
            {link && (
              <div>
                <CMSLink
                  {...link}
                  className={cn(
                    'inline-block rounded-full px-8 py-3 font-medium',
                    textColor === 'text-white'
                      ? 'bg-white text-finlandia-600 hover:bg-gray-100'
                      : 'bg-finlandia-600 text-white hover:bg-finlandia-700',
                  )}
                />
              </div>
            )}
          </div>
        </div>
        {/* Image column */}
        <div className="flex lg:hidden justify-center items-center z-10 col-span-1 lg:col-span-3 xl:col-span-4">
          <div className="relative aspect-square xl:aspect-video z-10">
            {image && typeof image === 'object' && (
              <Media
                imgClassName="w-full aspect-square xl:aspect-video object-cover z-10"
                resource={image}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
