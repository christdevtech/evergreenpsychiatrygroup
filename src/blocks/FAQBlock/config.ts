import type { Block } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { buttonClasses } from '@/fields/buttonClasses'
import { Code } from '../Code/config'
import { Banner } from '../Banner/config'
import { MediaBlock } from '../MediaBlock/config'

export const FAQBlock: Block = {
  slug: 'faqBlock',
  interfaceName: 'FAQBlock',
  fields: [
    bgColorPickerAll({
      overrides: {
        name: 'backgroundColor',
        label: 'Background Color',
        defaultValue: 'bg-berylgreen-500',
      },
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Browse our Frequently Asked Questions',
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            LinkFeature(),
          ]
        },
      }),
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'categories',
      options: [
        { label: 'Categories', value: 'categories' },
        { label: 'Individual Selection', value: 'selection' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'categories',
      },
      label: 'Categories To Show',
    },
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      label: 'Selected FAQs',
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Limit',
      defaultValue: 6,
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'categories',
      },
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        label: 'See More Link',
        defaultValue: {
          type: 'custom',
          url: '/faqs',
          label: 'See more FAQs',
          appearance: 'default',
        },
      },
    }),
    buttonClasses({
      overrides: {
        name: 'linkClasses',
        label: 'Link Button Classes',
      },
    }),
  ],
  labels: {
    plural: 'FAQ Blocks',
    singular: 'FAQ Block',
  },
}
