import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import type { ContentColumnSize } from './config'

import { CMSLink } from '../../components/Link'

interface ContentItemProps {
  contentType: 'richText' | 'link'
  richText?: any
  link?: any
}

interface ContentItem {
  contentType: 'richText' | 'link'
  richText?: any
  link?: any
}

interface Column {
  size: ContentColumnSize
  content: ContentItem[]
}

interface Row {
  columns: Column[]
}

interface ExtendedContentBlock extends Omit<ContentBlockProps, 'rows'> {
  rows?: Row[]
}

const ContentItem: React.FC<ContentItemProps> = ({ contentType, richText, link }) => {
  switch (contentType) {
    case 'richText':
      return richText ? <RichText data={richText} enableGutter={false} /> : null
    case 'link':
      return link ? <CMSLink {...link} /> : null
    default:
      return null
  }
}

export const ContentBlock: React.FC<ExtendedContentBlock> = (props) => {
  const { rows } = props

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

  return (
    <div className="container my-16">
      {rows?.map((row: Row, rowIndex: number) => (
        <div
          key={`row-${rowIndex}`}
          className="grid grid-cols-12 gap-y-8 gap-x-8 lg:gap-x-16 mb-16 last:mb-0"
        >
          {row.columns?.map((column: Column, columnIndex: number) => {
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
                  {column.content?.map((contentItem: ContentItem, contentIndex: number) => (
                    <ContentItem
                      key={`content-${contentIndex}`}
                      contentType={contentItem.contentType}
                      richText={contentItem.richText}
                      link={contentItem.link}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
