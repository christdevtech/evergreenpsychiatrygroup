import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { ContentColumnSize, VerticalAlignment } from './config'

import { CMSLink } from '../../components/Link'
import { extractSpacingClasses } from '@/fields/spacingClasses'

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

  const verticalAlignmentClasses: Record<VerticalAlignment, string> = {
    top: 'justify-start',
    center: 'justify-center',
    bottom: 'justify-end',
  }
  const horizontalAlignmentClasses: Record<VerticalAlignment, string> = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end',
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
        {rows?.map((row, rowIndex) => {
          const rowSpacingClasses = extractSpacingClasses(row.spacingClasses)

          return (
            <div
              key={`row-${rowIndex}`}
              className={cn(
                'grid grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-16 mb-16 last:mb-0',
                rowSpacingClasses,
              )}
            >
              {row.columns?.map((column, columnIndex: number) => {
                const size = column.size || 'full'
                const verticalAlignment = column.verticalAlignment || 'top'
                const horizontalAlignment = column.horizontalAlignment || 'top'
                const columnSpacingClasses = extractSpacingClasses(column.spacingClasses)

                return (
                  <div
                    key={`column-${columnIndex}`}
                    className={cn(
                      `lg:col-span-${colsSpanClasses[size]}`,
                      {
                        'col-span-6 md:col-span-4 xl:col-span-2': size === 'oneFifth',
                        'col-span-6 md:col-span-3 xl:col-span-3': size === 'oneQuarter',
                        'col-span-12 md:col-span-6 xl:col-span-4': size === 'oneThird',
                        'col-span-12 md:col-span-6 xl:col-span-5': size === 'twoFifths',
                        'col-span-12 md:col-span-6 xl:col-span-6': size === 'half',
                        'col-span-12 md:col-span-6 xl:col-span-7': size === 'threeFifths',
                        'col-span-12 md:col-span-6 xl:col-span-8': size === 'twoThirds',
                        'col-span-12 md:col-span-9 xl:col-span-9': size === 'threeQuarters',
                        'col-span-12 md:col-span-8 xl:col-span-10': size === 'fourFifths',
                        'col-span-12': size === 'full',
                      },
                      columnSpacingClasses,
                    )}
                  >
                    <div
                      className={cn(
                        'space-y-6 h-full flex flex-col',
                        verticalAlignmentClasses[verticalAlignment],
                        horizontalAlignmentClasses[horizontalAlignment],
                      )}
                    >
                      {column.content?.map((contentItem, contentIndex: number) => {
                        const ContentItem = (contentItemdata: typeof contentItem) => {
                          const {
                            contentType,
                            richText,
                            link,
                            media,
                            richTextClasses,
                            buttonClasses,
                          } = contentItemdata
                          switch (contentType) {
                            case 'richText':
                              return richText ? (
                                <RichText
                                  data={richText}
                                  enableGutter={false}
                                  enableProse={false}
                                  className={cn(richTextClasses)}
                                />
                              ) : null
                            case 'link':
                              return link ? (
                                <CMSLink {...link} className={cn(buttonClasses)} />
                              ) : null
                            case 'media':
                              return media ? <Media resource={media} /> : null
                            default:
                              return null
                          }
                        }

                        return (
                          <div key={`content-${contentIndex}`} className="contentItem">
                            <ContentItem {...contentItem} />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
