import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { ContentColumnSize } from './config'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { rows, background } = props
  function getBackgroundClasses(background?: ContentBlockProps['background']): string {
    if (!background) return ''

    switch (background.type) {
      case 'color':
        return background.backgroundColor || ''
      case 'gradient':
        return cn(
          background.gradientClasses?.type,
          background.gradientClasses?.fromColor,
          background.gradientClasses?.toColor,
          background.gradientClasses?.viaColor,
        )
      default:
        return ''
    }
  }

  const colsSpanClasses: Record<ContentColumnSize, string> = {
    full: '12',
    fourFifths: '10',
    threeQuarters: '9',
    twoThirds: '8',
    threeFifths: '7',
    half: '6',
    twoFifths: '5',
    oneThird: '4',
    oneQuarter: '3',
    oneFifth: '2',
  }

  const backgroundClasses = getBackgroundClasses(background)

  return (
    <div className={cn('relative overflow-hidden', backgroundClasses)}>
      {background?.type === 'media' && background.media && (
        <>
          <div className="absolute inset-0 z-0">
            <Media
              resource={background.media}
              className="absolute inset-0 w-full h-full object-cover object-center object-center"
              priority
            />
          </div>
          {background.overlay?.enabled && (
            <div
              className={cn(
                'absolute inset-0 z-1',
                background.overlay?.gradientOverlay?.type,
                background.overlay?.gradientOverlay?.fromColor,
                background.overlay?.gradientOverlay?.toColor,
                background.overlay?.gradientOverlay?.viaColor,
              )}
              style={{
                opacity: background.overlay.opacity ? background.overlay.opacity / 100 : 0.5,
              }}
            />
          )}
        </>
      )}
      <div className="container my-16 relative z-10">
        {rows?.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="grid grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-16 mb-16 last:mb-0"
          >
            {row.columns?.map((column, columnIndex: number) => {
              const size = column.size as ContentColumnSize

              return (
                <div
                  key={`column-${columnIndex}`}
                  className={cn(`col-span-12 md:col-span-6 lg:col-span-${colsSpanClasses[size]}`, {
                    'xl:col-span-2': size === 'oneFifth',
                    'xl:col-span-3': size === 'oneQuarter',
                    'xl:col-span-4': size === 'oneThird',
                    'xl:col-span-5': size === 'twoFifths',
                    'xl:col-span-6': size === 'half',
                    'xl:col-span-7': size === 'threeFifths',
                    'xl:col-span-8': size === 'twoThirds',
                    'xl:col-span-9': size === 'threeQuarters',
                    'xl:col-span-10': size === 'fourFifths',
                    'xl:col-span-12': size === 'full',
                  })}
                >
                  <div className="space-y-6">
                    {column.content?.map((contentItem, contentIndex: number) => {
                      const ContentItem = (contentItemdata: typeof contentItem) => {
                        const { contentType, richText, link } = contentItemdata
                        switch (contentType) {
                          case 'richText':
                            return richText ? (
                              <RichText data={richText} enableGutter={false} />
                            ) : null
                          case 'link':
                            return link ? <CMSLink {...link} /> : null
                          default:
                            return null
                        }
                      }

                      return (
                        <ContentItem
                          key={`content-${contentIndex}`}
                          contentType={contentItem.contentType}
                          richText={contentItem.richText}
                          link={contentItem.link}
                        />
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
