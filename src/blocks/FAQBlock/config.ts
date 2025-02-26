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
      name: 'faqs',
      type: 'array',
      label: 'FAQs',
      minRows: 3,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Question',
          defaultValue: 'How do I book a mental health therapist?',
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          label: 'Answer',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
              ]
            },
          }),
        },
      ],
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
