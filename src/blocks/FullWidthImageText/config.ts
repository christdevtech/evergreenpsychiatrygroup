import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const FullWidthImageText: Block = {
  slug: 'fullWidthImageText',
  interfaceName: 'FullWidthImageText',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Description',
    },
    bgColorPickerAll({
      overrides: {
        name: 'backgroundColor',
        defaultValue: 'bg-special-400',
      },
    }),
    {
      name: 'textColor',
      type: 'select',
      defaultValue: 'text-white',
      options: [
        { label: 'White (Default)', value: 'text-white' },
        { label: 'Black', value: 'text-black' },
      ],
      label: 'Text Color',
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        label: 'Call to Action Link',
      },
    }),
  ],
  labels: {
    plural: 'Full Width Image Text Blocks',
    singular: 'Full Width Image Text Block',
  },
}
