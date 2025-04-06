import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '../../fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { buttonClasses } from '@/fields/buttonClasses'

export const BookingBlock: Block = {
  slug: 'bookingBlock',
  interfaceName: 'BookingBlock',
  fields: [
    bgColorPickerAll({
      overrides: {
        name: 'backgroundColor',
        label: 'Background Color',
        defaultValue: 'bg-white',
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'accentColor',
        label: 'Accent Color (for square element)',
        defaultValue: 'bg-teal-500',
      },
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'You are one step closer to receiving the care you deserve.',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
      required: true,
      defaultValue: 'How it works',
    },
    {
      name: 'bookingOptions',
      type: 'array',
      label: 'Booking Options',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Option Title',
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Option Content',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                LinkFeature(),
              ]
            },
          }),
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Option Media',
        },
      ],
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        label: 'Button',
        defaultValue: {
          type: 'custom',
          url: '/book-appointment',
          label: 'Book appointment',
          appearance: 'default',
        },
      },
    }),
    buttonClasses({
      overrides: {
        name: 'buttonClasses',
        label: 'Button Classes',
      },
    }),
    {
      name: 'ending',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Ending Title',
          defaultValue: 'You can also contact us in the following ways',
          required: true,
        },
        {
          name: 'email',
          type: 'text',
          label: 'Email',
          defaultValue: 'info@evergreenpsychiatrygroup.com',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Phone',
          defaultValue: '+11 2345 5689 87455',
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'Booking Blocks',
    singular: 'Booking Block',
  },
}
