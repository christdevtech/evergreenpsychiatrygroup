import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { ContentColumnSize, VerticalAlignment } from './config'

import { CMSLink } from '../../components/Link'
import { extractSpacingClasses } from '@/fields/spacingClasses'

// Define extended content item type to include location fields
interface LocationContentItem {
  contentType: 'location'
  location: {
    title: string
    address: string
    phone: string
    hours: string
  }
  locationAddressIcon?: any
  locationPhoneIcon?: any
  locationHoursIcon?: any
  locationTextColor?: string[]
  locationDividerColor?: string
}

// Extend the existing content item types
type ExtendedContentItem =
  | {
      contentType: 'richText' | 'link' | 'media'
      richText?: any
      link?: any
      media?: any
      richTextClasses?: string
      buttonClasses?: string
    }
  | LocationContentItem

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
    full: '100%',
    fourFifths: '80%',
    threeQuarters: '75%',
    twoThirds: '66.67%',
    threeFifths: '60%',
    half: '50%',
    twoFifths: '40%',
    oneThird: '33.33%',
    oneQuarter: '25%',
    oneFifth: '20%',
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
              className={cn('flex flex-wrap last:mb-0 space-y-16', rowSpacingClasses)}
            >
              {row.columns?.map((column, columnIndex: number) => {
                const size = column.size || 'full'
                const verticalAlignment = column.verticalAlignment || 'top'
                const horizontalAlignment = column.horizontalAlignment || 'top'
                const columnSpacingClasses = extractSpacingClasses(column.spacingClasses)

                // Get the responsive width classes based on column size
                const getResponsiveWidthClasses = (size: ContentColumnSize) => {
                  switch (size) {
                    case 'oneFifth':
                      return 'max-w-[50%] md:max-w-[33.3%] lg:max-w-[20%]'
                    case 'oneQuarter':
                      return 'max-w-[50%] lg:max-w-[25%]'
                    case 'oneThird':
                      return 'w-full md:max-w-[50%] lg:max-w-[33.3%]'
                    case 'twoFifths':
                      return 'w-full md:max-w-[50%] lg:max-w-[40%]'
                    case 'half':
                      return 'w-full md:max-w-[50%]'
                    case 'threeFifths':
                      return 'w-full md:max-w-[50%] lg:max-w-[60%]'
                    case 'twoThirds':
                      return 'w-full md:max-w-[50%] lg:max-w-[66.6%]'
                    case 'threeQuarters':
                      return 'w-full md:max-w-[50%] lg:max-w-[75%]'
                    case 'fourFifths':
                      return 'w-full md:max-w-[50%] lg:max-w-[80%]'
                    case 'full':
                    default:
                      return 'w-full'
                  }
                }

                return (
                  <div
                    key={`column-${columnIndex}`}
                    className={cn(
                      'flex-grow',
                      getResponsiveWidthClasses(size),
                      columnSpacingClasses,
                    )}
                  >
                    <div
                      className={cn(
                        'space-y-6 h-full w-full flex flex-col',
                        verticalAlignmentClasses[verticalAlignment],
                        horizontalAlignmentClasses[horizontalAlignment],
                      )}
                    >
                      {column.content?.map((contentItem, contentIndex: number) => {
                        const ContentItem = (contentItemdata: ExtendedContentItem) => {
                          const { contentType } = contentItemdata

                          switch (contentType) {
                            case 'richText':
                              const { richText, richTextClasses } = contentItemdata
                              return richText ? (
                                <RichText
                                  data={richText}
                                  enableGutter={false}
                                  enableProse={false}
                                  className={cn(richTextClasses)}
                                />
                              ) : null
                            case 'link':
                              const { link, buttonClasses } = contentItemdata
                              return link ? (
                                <CMSLink {...link} className={cn(buttonClasses)} />
                              ) : null
                            case 'media':
                              const { media } = contentItemdata
                              return media ? <Media resource={media} /> : null
                            case 'location':
                              const {
                                location,
                                locationAddressIcon,
                                locationPhoneIcon,
                                locationHoursIcon,
                                locationTextColor,
                                locationDividerColor,
                              } = contentItemdata

                              return (
                                <div className="flex flex-col w-full">
                                  {location.title && (
                                    <h2
                                      className={cn(
                                        'text-3xl md:text-4xl lg:text-5xl font-semibold mb-4',
                                        locationTextColor,
                                      )}
                                    >
                                      In {location.title}
                                    </h2>
                                  )}
                                  <hr
                                    className={cn(
                                      'w-full h-0.5 mb-6',
                                      locationDividerColor || 'bg-slate-200',
                                    )}
                                  />

                                  {location.address && (
                                    <div className="flex items-start mb-4">
                                      {locationAddressIcon && (
                                        <div className="mr-3 mt-1">
                                          <Media
                                            resource={locationAddressIcon}
                                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                                          />
                                        </div>
                                      )}
                                      <p
                                        className={cn(
                                          'text-lg md:text-xl lg:text-2xl',
                                          locationTextColor,
                                        )}
                                      >
                                        {location.address}
                                      </p>
                                    </div>
                                  )}

                                  {location.phone && (
                                    <div className="flex items-center mb-4">
                                      {locationPhoneIcon && (
                                        <div className="mr-3 mt-1">
                                          <Media
                                            resource={locationPhoneIcon}
                                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                                          />
                                        </div>
                                      )}
                                      <p
                                        className={cn(
                                          'text-lg md:text-xl lg:text-2xl',
                                          locationTextColor,
                                        )}
                                      >
                                        {location.phone}
                                      </p>
                                    </div>
                                  )}

                                  {location.hours && (
                                    <div className="flex items-center">
                                      {locationHoursIcon && (
                                        <div className="mr-3 mt-1">
                                          <Media
                                            resource={locationHoursIcon}
                                            className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
                                          />
                                        </div>
                                      )}
                                      <p
                                        className={cn(
                                          'text-lg md:text-xl lg:text-2xl',
                                          locationTextColor,
                                        )}
                                      >
                                        {location.hours}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )
                            default:
                              return null
                          }
                        }

                        return (
                          <div key={`content-${contentIndex}`} className="contentItem">
                            <ContentItem {...(contentItem as ExtendedContentItem)} />
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
