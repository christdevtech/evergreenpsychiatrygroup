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
]

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: '2 / 12',
        value: 'oneFifth',
      },
      {
        label: '3 / 13',
        value: 'oneQuarter',
      },
      {
        label: '4 / 12',
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
        label: '8 / 12',
        value: 'twoThirds',
      },
      {
        label: '9 / 12',
        value: 'threeQuarters',
      },
      {
        label: '10 / 12',
        value: 'fourFifths',
      },
      {
        label: 'Full',
        value: 'full',
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
]

const backgroundFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    defaultValue: 'none',
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
      ],
    },
  ],
}
