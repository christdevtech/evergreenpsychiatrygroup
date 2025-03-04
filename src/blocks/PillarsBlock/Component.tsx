import React from 'react'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import type { PillarsBlock as PillarsBlockType } from '@/payload-types'

// Define the types for our component
// interface PillarItem {
//   title?: string
//   text?: any // Rich text data
// }

// interface PillarsBlockType {
//   backgroundColor?: string
//   circleBackgroundColor?: string
//   padding?: string
//   title?: string
//   titleClasses?: string[]
//   description?: any // Rich text data
//   descriptionClasses?: string[]
//   items?: PillarItem[]
//   itemTitleClasses?: string[]
//   itemTextClasses?: string[]
// }

type Props = PillarsBlockType & {
  className?: string
  disableInnerContainer?: boolean
}

export const PillarsBlock: React.FC<Props> = (props) => {
  const {
    backgroundColor,
    circleBackgroundColor,
    padding,
    title,
    titleClasses,
    description,
    descriptionClasses,
    items,
    itemTitleClasses,
    itemTextClasses,
    className,
    disableInnerContainer = false,
  } = props

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        padding || 'py-16 md:py-24',
        backgroundColor || 'bg-white',
        className,
      )}
    >
      {/* Background circle positioned in the bottom-left corner */}
      <div
        className={cn(
          'absolute -bottom-[100px] -left-[100px] md:-bottom-[200px] md:-left-[200px] lg:-bottom-[300px] lg:-left-[300px] w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px] xl:-left-[400px] xl:-bottom-[400px] aspect-square rounded-full',
          circleBackgroundColor,
        )}
        aria-hidden="true"
      />

      <div className={cn('container relative z-10')}>
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left column - Title and Description */}
          <div className="w-full lg:w-[39%] mb-8 md:mb-0">
            {title && <h2 className={cn(titleClasses)}>{title}</h2>}

            {description && (
              <div className={cn(descriptionClasses)}>
                <RichText data={description} enableGutter={false} enableProse={false} />
              </div>
            )}
          </div>

          {/* Right column - Grid of items */}
          <div className="w-full lg:w-[61%] mb-16 lg:mb-0">
            {items && items.length > 0 && (
              <div className="grid grid-cols-2 gap-6 md:gap-12">
                {items.map((item, index: number) => (
                  <div key={index} className="flex flex-col">
                    <div className="h-4 w-4 bg-white rounded-full mb-2 md:mb-4 lg:mb-6"></div>
                    {item.title && <h3 className={cn(itemTitleClasses)}>{item.title}</h3>}
                    {item.text && (
                      <div className={cn(itemTextClasses)}>
                        <RichText data={item.text} enableGutter={false} enableProse={false} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
