import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { gradientClasses } from '@/fields/gradientClasses'
import { textClasses } from '@/fields/textClasses'
import { spacingClasses } from '@/fields/spacingClasses'
import { buttonClasses } from '@/fields/buttonClasses'

export type ContentColumnSize =
  | 'oneFifth'
  | 'oneQuarter'
  | 'oneThird'
  | 'twoFifths'
  | 'half'
  | 'threeFifths'
  | 'twoThirds'
  | 'threeQuarters'
  | 'fourFifths'
  | 'full'

export type VerticalAlignment = 'top' | 'center' | 'bottom'
export type HorizontalAlignment = 'top' | 'center' | 'bottom'

const contentTypes: Field[] = [
  {
    name: 'contentType',
    type: 'select',
    required: true,
    defaultValue: 'richText',
    options: [
      {
        label: 'Rich Text',
        value: 'richText',
      },
      {
        label: 'Link',
        value: 'link',
      },
      {
        label: 'Media',
        value: 'media',
      },
      {
        label: 'Location',
        value: 'location',
      },
      {
        label: 'Social',
        value: 'social',
      },
      {
        label: 'Spacer',
        value: 'spacer',
      },
    ],
  },
  {
    name: 'spacingValue',
    type: 'select',
    required: true,
    admin: {
      condition: (_, { contentType }) => contentType === 'spacer',
    },
    options: [
      { label: '4 (1rem)', value: '4' },
      { label: '6 (1.5rem)', value: '6' },
      { label: '8 (2rem)', value: '8' },
      { label: '10 (2.5rem)', value: '10' },
      { label: '12 (3rem)', value: '12' },
      { label: '16 (4rem)', value: '16' },
      { label: '20 (5rem)', value: '20' },
      { label: '24 (6rem)', value: '24' },
      { label: '32 (8rem)', value: '32' },
      { label: '40 (10rem)', value: '40' },
      { label: '48 (12rem)', value: '48' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
  },
  textClasses({
    overrides: {
      name: 'richTextClasses',
    },
    condition: (_, { contentType }) => contentType === 'richText',
  }),
  link({
    overrides: {
      admin: {
        condition: (_, { contentType }) => contentType === 'link',
      },
    },
  }),
  buttonClasses({
    condition: (_, { contentType }) => contentType === 'link',
  }),
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, { contentType }) => contentType === 'media',
    },
  },
  // Location fields
  {
    name: 'location',
    type: 'relationship',
    relationTo: 'locations',
    admin: {
      condition: (_, { contentType }) => contentType === 'location',
    },
  },
  {
    name: 'locationAddressIcon',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, { contentType }) => contentType === 'location',
    },
  },
  {
    name: 'locationPhoneIcon',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, { contentType }) => contentType === 'location',
    },
  },
  {
    name: 'locationHoursIcon',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, { contentType }) => contentType === 'location',
    },
  },
  textClasses({
    overrides: {
      name: 'locationTextColor',
      label: 'Text Color',
    },
    condition: (_, { contentType }) => contentType === 'location',
  }),
  bgColorPickerAll({
    overrides: {
      name: 'locationDividerColor',
      label: 'Divider Color',
    },
    condition: (_, { contentType }) => contentType === 'location',
  }),
  {
    label: 'Social Links',
    type: 'collapsible',
    admin: {
      condition: (_, { contentType }) => contentType === 'social',
    },

    fields: [
      {
        name: 'socialTitle',
        type: 'text',
        defaultValue: 'Social Links',
        required: true,
      },
      textClasses({
        overrides: {
          name: 'socialTitleClasses',
          admin: {
            defaultValue: ['text-2xl', 'font-bold'],
          },
        },
      }),
      {
        name: 'socialLinks',
        type: 'relationship',
        relationTo: 'socials',
        hasMany: true,
      },
      {
        name: 'displayLabels',
        type: 'checkbox',
        defaultValue: false,
      },
      {
        name: 'orientation',
        type: 'select',
        defaultValue: 'horizontal',
        options: [
          { label: 'Horizontal', value: 'horizontal' },
          { label: 'Vertical', value: 'vertical' },
        ],
      },
      {
        name: 'iconSize',
        type: 'select',
        defaultValue: 'small',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
      {
        name: 'gap',
        type: 'select',
        defaultValue: 'small',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ],
      },
    ],
  },
]
const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: 'One-Sixth',
        value: 'oneFifth',
      },
      {
        label: 'One-Quarter',
        value: 'oneQuarter',
      },
      {
        label: 'One-Third',
        value: 'oneThird',
      },
      {
        label: '5 / 12',
        value: 'twoFifths',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: '7 / 12',
        value: 'threeFifths',
      },
      {
        label: 'Two-Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Three-Quarters',
        value: 'threeQuarters',
      },
      {
        label: 'Four-Fifths',
        value: 'fourFifths',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'verticalAlignment',
    type: 'select',
    defaultValue: 'top',
    options: [
      {
        label: 'Top',
        value: 'top',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Bottom',
        value: 'bottom',
      },
    ],
  },
  {
    name: 'horizontalAlignment',
    type: 'select',
    defaultValue: 'top',
    options: [
      {
        label: 'Left',
        value: 'top',
      },
      {
        label: 'Center',
        value: 'center',
      },
      {
        label: 'Right',
        value: 'bottom',
      },
    ],
  },
  {
    name: 'content',
    type: 'array',
    label: 'Content Blocks',
    minRows: 1,
    fields: contentTypes,
  },
  spacingClasses(),
]

const backgroundFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    defaultValue: 'color',
    options: [
      {
        label: 'None',
        value: 'none',
      },
      {
        label: 'Color',
        value: 'color',
      },
      {
        label: 'Gradient',
        value: 'gradient',
      },
      {
        label: 'Media',
        value: 'media',
      },
    ],
  },
  gradientClasses({
    condition: (_, { type }) => type === 'gradient',
  }),
  bgColorPickerAll({
    overrides: {
      name: 'backgroundColor',
      defaultValue: 'bg-transparent',
    },
    condition: (_, { type }) => type === 'color',
  }),
  {
    name: 'media',
    type: 'upload',
    relationTo: 'media',
    required: false,
    admin: {
      condition: (_, { type }) => type === 'media',
    },
  },
  {
    name: 'overlay',
    type: 'group',
    admin: {
      condition: (_, { type }) => type === 'media',
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        defaultValue: false,
      },
      gradientClasses({
        overrides: {
          name: 'gradientOverlay',
        },
        condition: (_, { enabled }) => enabled,
      }),
      {
        name: 'opacity',
        type: 'number',
        min: 0,
        max: 100,
        defaultValue: 50,
        admin: {
          condition: (_, { enabled }) => enabled,
        },
      },
    ],
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'background',
      type: 'group',
      fields: backgroundFields,
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Content Rows',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'columns',
          type: 'array',
          label: 'Columns',
          minRows: 1,
          fields: columnFields,
        },
        spacingClasses(),
      ],
    },
  ],
}
