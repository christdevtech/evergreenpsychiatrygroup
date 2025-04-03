import type { Block, Field } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
  ChecklistFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'

import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { gradientClasses } from '@/fields/gradientClasses'
import { textClasses } from '@/fields/textClasses'
import { spacingClasses } from '@/fields/spacingClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { ImageTextBlock } from '../ImageTextBlock/config'
import { FormBlock } from '../Form/config'
import { colorSelector } from '@/fields/colorSelector'

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
      {
        label: 'Insurances',
        value: 'insurances',
      },
    ],
  },
  {
    name: 'spacingValue',
    type: 'select',
    required: true,
    hasMany: true,
    defaultValue: ['pb-0', 'md:pb-8', 'lg:pb-12', 'xl:pb-16'],
    admin: {
      condition: (_, { contentType }) => contentType === 'spacer',
    },
    options: [
      { label: 'None', value: 'pb-0' },
      { label: 'Space 1', value: 'pb-1' },
      { label: 'Space 2', value: 'pb-2' },
      { label: 'Space 4', value: 'pb-4' },
      { label: 'Space 8', value: 'pb-8' },
      { label: 'Space 10', value: 'pb-10' },
      { label: 'Space 12', value: 'pb-12' },
      { label: 'Space 16', value: 'pb-16' },
      { label: 'Space 20', value: 'pb-20' },
      { label: 'Space 24', value: 'pb-24' },
      { label: 'Space 32', value: 'pb-32' },
      { label: 'Space 40', value: 'pb-40' },
      // add options for different screen sizes
      { label: 'md:None', value: 'md:pb-0' },
      { label: 'md:Space 1', value: 'md:pb-1' },
      { label: 'md:Space 2', value: 'md:pb-2' },
      { label: 'md:Space 4', value: 'md:pb-4' },
      { label: 'md:Space 8', value: 'md:pb-8' },
      { label: 'md:Space 10', value: 'md:pb-10' },
      { label: 'md:Space 12', value: 'md:pb-12' },
      { label: 'md:Space 16', value: 'md:pb-16' },
      { label: 'md:Space 20', value: 'md:pb-20' },
      { label: 'md:Space 24', value: 'md:pb-24' },
      { label: 'md:Space 32', value: 'md:pb-32' },
      { label: 'md:Space 40', value: 'md:pb-40' },

      { label: 'lg:None', value: 'lg:pb-0' },
      { label: 'lg:Space 1', value: 'lg:pb-1' },
      { label: 'lg:Space 2', value: 'lg:pb-2' },
      { label: 'lg:Space 4', value: 'lg:pb-4' },
      { label: 'lg:Space 8', value: 'lg:pb-8' },
      { label: 'lg:Space 10', value: 'lg:pb-10' },
      { label: 'lg:Space 12', value: 'lg:pb-12' },
      { label: 'lg:Space 16', value: 'lg:pb-16' },
      { label: 'lg:Space 20', value: 'lg:pb-20' },
      { label: 'lg:Space 24', value: 'lg:pb-24' },
      { label: 'lg:Space 32', value: 'lg:pb-32' },
      { label: 'lg:Space 40', value: 'lg:pb-40' },
      // XL options
      { label: 'xl:None', value: 'xl:pb-0' },
      { label: 'xl:Space 1', value: 'xl:pb-1' },
      { label: 'xl:Space 2', value: 'xl:pb-2' },
      { label: 'xl:Space 4', value: 'xl:pb-4' },
      { label: 'xl:Space 8', value: 'xl:pb-8' },
      { label: 'xl:Space 10', value: 'xl:pb-10' },
      { label: 'xl:Space 12', value: 'xl:pb-12' },
      { label: 'xl:Space 16', value: 'xl:pb-16' },
      { label: 'xl:Space 20', value: 'xl:pb-20' },
      { label: 'xl:Space 24', value: 'xl:pb-24' },
      { label: 'xl:Space 32', value: 'xl:pb-32' },
      { label: 'xl:Space 40', value: 'xl:pb-40' },
      // 2XL options
      { label: '2xl:None', value: '2xl:pb-0' },
      { label: '2xl:Space 1', value: '2xl:pb-1' },
      { label: '2xl:Space 2', value: '2xl:pb-2' },
      { label: '2xl:Space 4', value: '2xl:pb-4' },
      { label: '2xl:Space 8', value: '2xl:pb-8' },
      { label: '2xl:Space 10', value: '2xl:pb-10' },
      { label: '2xl:Space 12', value: '2xl:pb-12' },
      { label: '2xl:Space 16', value: '2xl:pb-16' },
      { label: '2xl:Space 20', value: '2xl:pb-20' },
      { label: '2xl:Space 24', value: '2xl:pb-24' },
      { label: '2xl:Space 32', value: '2xl:pb-32' },
      { label: '2xl:Space 40', value: '2xl:pb-40' },
      // 3XL options
      { label: '3xl:None', value: '3xl:pb-0' },
      { label: '3xl:Space 1', value: '3xl:pb-1' },
      { label: '3xl:Space 2', value: '3xl:pb-2' },
      { label: '3xl:Space 4', value: '3xl:pb-4' },
      { label: '3xl:Space 8', value: '3xl:pb-8' },
      { label: '3xl:Space 10', value: '3xl:pb-10' },
      { label: '3xl:Space 12', value: '3xl:pb-12' },
      { label: '3xl:Space 16', value: '3xl:pb-16' },
      { label: '3xl:Space 20', value: '3xl:pb-20' },
      { label: '3xl:Space 24', value: '3xl:pb-24' },
      { label: '3xl:Space 32', value: '3xl:pb-32' },
      { label: '3xl:Space 40', value: '3xl:pb-40' },
    ],
  },
  bgColorPickerAll({
    overrides: {
      name: 'spacerBgColor',
      defaultValue: 'bg-transparent',
    },
    condition: (_, { contentType }) => contentType === 'spacer',
  }),
  {
    name: 'spacerWidth',
    type: 'select',
    required: true,
    hasMany: true,
    defaultValue: ['w-full'],
    admin: {
      condition: (_, { contentType }) => contentType === 'spacer',
    },
    options: [
      { label: 'Full', value: 'w-full' },
      { label: 'Half', value: 'w-1/2' },
      { label: 'Third', value: 'w-1/3' },
      { label: 'Two Thirds', value: 'w-2/3' },
      { label: 'Quarter', value: 'w-1/4' },
      { label: 'Three Quarters', value: 'w-3/4' },
      { label: 'One Fifth', value: 'w-1/5' },
      { label: 'Two Fifths', value: 'w-2/5' },
      { label: 'Three Fifths', value: 'w-3/5' },
      { label: 'Four Fifths', value: 'w-4/5' },
      // add options for different screen sizes
      { label: 'md:Full', value: 'md:w-full' },
      { label: 'md:Half', value: 'md:w-1/2' },
      { label: 'md:Third', value: 'md:w-1/3' },
      { label: 'md:Two Thirds', value: 'md:w-2/3' },
      { label: 'md:Quarter', value: 'md:w-1/4' },
      { label: 'md:Three Quarters', value: 'md:w-3/4' },
      { label: 'md:One Fifth', value: 'md:w-1/5' },
      { label: 'md:Two Fifths', value: 'md:w-2/5' },
      { label: 'md:Three Fifths', value: 'md:w-3/5' },
      { label: 'md:Four Fifths', value: 'md:w-4/5' },
      { label: 'lg:Full', value: 'lg:w-full' },
      { label: 'lg:Half', value: 'lg:w-1/2' },
      { label: 'lg:Third', value: 'lg:w-1/3' },
      { label: 'lg:Two Thirds', value: 'lg:w-2/3' },
      { label: 'lg:Quarter', value: 'lg:w-1/4' },
      { label: 'lg:Three Quarters', value: 'lg:w-3/4' },
      { label: 'lg:One Fifth', value: 'lg:w-1/5' },
      { label: 'lg:Two Fifths', value: 'lg:w-2/5' },
      { label: 'lg:Three Fifths', value: 'lg:w-3/5' },
      { label: 'lg:Four Fifths', value: 'lg:w-4/5' },
      { label: 'xl:Full', value: 'xl:w-full' },
      { label: 'xl:Half', value: 'xl:w-1/2' },
      { label: 'xl:Third', value: 'xl:w-1/3' },
      { label: 'xl:Two Thirds', value: 'xl:w-2/3' },
      { label: 'xl:Quarter', value: 'xl:w-1/4' },
      { label: 'xl:Three Quarters', value: 'xl:w-3/4' },
      { label: 'xl:One Fifth', value: 'xl:w-1/5' },
      { label: 'xl:Two Fifths', value: 'xl:w-2/5' },
      { label: 'xl:Three Fifths', value: 'xl:w-3/5' },
      { label: 'xl:Four Fifths', value: 'xl:w-4/5' },
      { label: '2xl:Full', value: '2xl:w-full' },
      { label: '2xl:Half', value: '2xl:w-1/2' },
      { label: '2xl:Third', value: '2xl:w-1/3' },
      { label: '2xl:Two Thirds', value: '2xl:w-2/3' },
      { label: '2xl:Quarter', value: '2xl:w-1/4' },
      { label: '2xl:Three Quarters', value: '2xl:w-3/4' },
      { label: '2xl:One Fifth', value: '2xl:w-1/5' },
      { label: '2xl:Two Fifths', value: '2xl:w-2/5' },
      { label: '2xl:Three Fifths', value: '2xl:w-3/5' },
      { label: '2xl:Four Fifths', value: '2xl:w-4/5' },
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
          BlocksFeature({ blocks: [Banner, Code, MediaBlock, ImageTextBlock, FormBlock] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          ChecklistFeature(),
          OrderedListFeature(),
          UnorderedListFeature(),
          AlignFeature(),
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
  {
    name: 'enableProse',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
  },
  {
    name: 'enableGutter',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      condition: (_, { contentType }) => contentType === 'richText',
    },
  },
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
  // Insurance Fields
  {
    label: 'Insurance Settings',
    type: 'collapsible',
    admin: {
      condition: (_, { contentType }) => contentType === 'insurances',
    },
    fields: [
      {
        name: 'insuranceTitle',
        type: 'text',
        defaultValue: 'Insurances Accepted',
        required: true,
      },
      textClasses({
        overrides: {
          name: 'insuranceTitleClasses',
          admin: {
            defaultValue: ['text-4xl', 'font-bold', 'text-center', 'mb-12'],
          },
        },
        condition: (_, { contentType }) => contentType === 'insurances',
      }),
      {
        name: 'insuranceImages',
        type: 'array',
        required: true,
        admin: {
          description: 'Add insurance logos here. These will be displayed in a grid.',
        },
        fields: [
          {
            name: 'image',
            type: 'upload',
            relationTo: 'media',
            required: true,
          },
          {
            name: 'name',
            type: 'text',
            defaultValue: 'Aetna',
            required: true,
          },
          {
            name: 'url',
            type: 'text',
            defaultValue: '#',
            admin: {
              description: 'Optional URL to the insurance website',
            },
          },
        ],
      },
      {
        name: 'gridColumns',
        type: 'group',
        admin: {
          description: 'Configure the number of columns in the grid for different screen sizes',
        },
        fields: [
          {
            name: 'sm',
            label: 'Mobile',
            type: 'select',
            defaultValue: '2',
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
            ],
          },
          {
            name: 'md',
            label: 'Tablet',
            type: 'select',
            defaultValue: '3',
            options: [
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
            ],
          },
          {
            name: 'lg',
            label: 'Desktop',
            type: 'select',
            defaultValue: '4',
            options: [
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
              { label: '7', value: '7' },
              { label: '8', value: '8' },
            ],
          },
          {
            name: 'xl',
            label: 'Large Desktop',
            type: 'select',
            defaultValue: '4',
            options: [
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
              { label: '7', value: '7' },
              { label: '8', value: '8' },
            ],
          },
        ],
      },
      {
        name: 'infoText',
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
          description: 'Text that appears below the insurance logos',
        },
      },
      {
        name: 'showAllButtonText',
        type: 'text',
        defaultValue: 'See all accepted insurances',
        required: true,
      },
      {
        name: 'hideAllButtonText',
        type: 'text',
        defaultValue: 'Back to top',
        required: true,
      },
      {
        name: 'allInsurancesList',
        type: 'array',
        admin: {
          description: 'List of all insurances that will be shown when toggled',
        },
        fields: [
          {
            name: 'name',
            type: 'text',
            defaultValue: 'Aetna',
            required: true,
          },
        ],
      },
      bgColorPickerAll({
        condition: (_, { contentType }) => contentType === 'insurances',
        overrides: {
          defaultValue: 'bg-cyan-50',
        },
      }),
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
    type: 'collapsible',
    label: 'Column Order',
    fields: [
      {
        name: 'columnOrder',
        type: 'group',
        label: 'Column Order',
        fields: [
          {
            name: 'default',
            type: 'select',
            defaultValue: 'order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: 'order-none',
              },
              {
                label: 'First',
                value: 'order-first',
              },
              {
                label: 'Last',
                value: 'order-last',
              },
              {
                label: '1',
                value: 'order-1',
              },
              {
                label: '2',
                value: 'order-2',
              },
              {
                label: '3',
                value: 'order-3',
              },
              {
                label: '4',
                value: 'order-4',
              },
              {
                label: '5',
                value: 'order-5',
              },
              {
                label: '6',
                value: 'order-6',
              },
              {
                label: '7',
                value: 'order-7',
              },
              {
                label: '8',
                value: 'order-8',
              },
              {
                label: '9',
                value: 'order-9',
              },
              {
                label: '10',
                value: 'order-10',
              },
              {
                label: '11',
                value: 'order-11',
              },
              {
                label: '12',
                value: 'order-12',
              },
            ],
          },
          {
            name: 'sm',
            type: 'select',
            defaultValue: 'sm:order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: 'sm:order-none',
              },
              {
                label: 'First',
                value: 'sm:order-first',
              },
              {
                label: 'Last',
                value: 'sm:order-last',
              },
              {
                label: '1',
                value: 'sm:order-1',
              },
              {
                label: '2',
                value: 'sm:order-2',
              },
              {
                label: '3',
                value: 'sm:order-3',
              },
              {
                label: '4',
                value: 'sm:order-4',
              },
              {
                label: '5',
                value: 'sm:order-5',
              },
              {
                label: '6',
                value: 'sm:order-6',
              },
              {
                label: '7',
                value: 'sm:order-7',
              },
              {
                label: '8',
                value: 'sm:order-8',
              },
              {
                label: '9',
                value: 'sm:order-9',
              },
              {
                label: '10',
                value: 'sm:order-10',
              },
              {
                label: '11',
                value: 'sm:order-11',
              },
              {
                label: '12',
                value: 'sm:order-12',
              },
            ],
          },
          {
            name: 'md',
            type: 'select',
            defaultValue: 'md:order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: 'md:order-none',
              },
              {
                label: 'First',
                value: 'md:order-first',
              },
              {
                label: 'Last',
                value: 'md:order-last',
              },
              {
                label: '1',
                value: 'md:order-1',
              },
              {
                label: '2',
                value: 'md:order-2',
              },
              {
                label: '3',
                value: 'md:order-3',
              },
              {
                label: '4',
                value: 'md:order-4',
              },
              {
                label: '5',
                value: 'md:order-5',
              },
              {
                label: '6',
                value: 'md:order-6',
              },
              {
                label: '7',
                value: 'md:order-7',
              },
              {
                label: '8',
                value: 'md:order-8',
              },
              {
                label: '9',
                value: 'md:order-9',
              },
              {
                label: '10',
                value: 'md:order-10',
              },
              {
                label: '11',
                value: 'md:order-11',
              },
              {
                label: '12',
                value: 'md:order-12',
              },
            ],
          },
          {
            name: 'lg',
            type: 'select',
            defaultValue: 'lg:order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: 'lg:order-none',
              },
              {
                label: 'First',
                value: 'lg:order-first',
              },
              {
                label: 'Last',
                value: 'lg:order-last',
              },
              {
                label: '1',
                value: 'lg:order-1',
              },
              {
                label: '2',
                value: 'lg:order-2',
              },
              {
                label: '3',
                value: 'lg:order-3',
              },
              {
                label: '4',
                value: 'lg:order-4',
              },
              {
                label: '5',
                value: 'lg:order-5',
              },
              {
                label: '6',
                value: 'lg:order-6',
              },
              {
                label: '7',
                value: 'lg:order-7',
              },
              {
                label: '8',
                value: 'lg:order-8',
              },
              {
                label: '9',
                value: 'lg:order-9',
              },
              {
                label: '10',
                value: 'lg:order-10',
              },
              {
                label: '11',
                value: 'lg:order-11',
              },
              {
                label: '12',
                value: 'lg:order-12',
              },
            ],
          },
          {
            name: 'xl',
            type: 'select',
            defaultValue: 'xl:order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: 'xl:order-none',
              },
              {
                label: 'First',
                value: 'xl:order-first',
              },
              {
                label: 'Last',
                value: 'xl:order-last',
              },
              {
                label: '1',
                value: 'xl:order-1',
              },
              {
                label: '2',
                value: 'xl:order-2',
              },
              {
                label: '3',
                value: 'xl:order-3',
              },
              {
                label: '4',
                value: 'xl:order-4',
              },
              {
                label: '5',
                value: 'xl:order-5',
              },
              {
                label: '6',
                value: 'xl:order-6',
              },
              {
                label: '7',
                value: 'xl:order-7',
              },
              {
                label: '8',
                value: 'xl:order-8',
              },
              {
                label: '9',
                value: 'xl:order-9',
              },
              {
                label: '10',
                value: 'xl:order-10',
              },
              {
                label: '11',
                value: 'xl:order-11',
              },
              {
                label: '12',
                value: 'xl:order-12',
              },
            ],
          },
          {
            name: '2xl',
            type: 'select',
            defaultValue: '2xl:order-none',
            options: [
              {
                label: 'None (Natural Order)',
                value: '2xl:order-none',
              },
              {
                label: 'First',
                value: '2xl:order-first',
              },
              {
                label: 'Last',
                value: '2xl:order-last',
              },
              {
                label: '1',
                value: '2xl:order-1',
              },
              {
                label: '2',
                value: '2xl:order-2',
              },
              {
                label: '3',
                value: '2xl:order-3',
              },
              {
                label: '4',
                value: '2xl:order-4',
              },
              {
                label: '5',
                value: '2xl:order-5',
              },
              {
                label: '6',
                value: '2xl:order-6',
              },
              {
                label: '7',
                value: '2xl:order-7',
              },
              {
                label: '8',
                value: '2xl:order-8',
              },
              {
                label: '9',
                value: '2xl:order-9',
              },
              {
                label: '10',
                value: '2xl:order-10',
              },
              {
                label: '11',
                value: '2xl:order-11',
              },
              {
                label: '12',
                value: '2xl:order-12',
              },
            ],
          },
        ],
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
  {
    type: 'collapsible',
    label: 'Spacing and Background',
    admin: {
      initCollapsed: true,
    },
    fields: [spacingClasses()],
  },
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
        {
          type: 'collapsible',
          label: 'Spacing',
          admin: {
            initCollapsed: true,
          },
          fields: [spacingClasses()],
        },
      ],
    },
    {
      name: 'background',
      type: 'group',
      fields: backgroundFields,
    },
    {
      name: 'separator',
      type: 'group',
      label: 'Content Separator',
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Separator',
          defaultValue: false,
        },
        colorSelector({
          overrides: {
            name: 'color',
            label: 'Separator Color',
            defaultValue: 'teal-600',
          },
          admin: {
            condition: (_, { enabled }) => enabled,
          },
        }),
        {
          name: 'thickness',
          type: 'select',
          label: 'Separator Thickness',
          defaultValue: '2',
          options: [
            { label: 'Thin (0.5px)', value: '0.5' },
            { label: 'Normal (1px)', value: '1' },
            { label: 'Medium (2px)', value: '2' },
            { label: 'Thick (3px)', value: '3' },
            { label: 'Extra Thick (4px)', value: '4' },
            { label: 'Huge (5px)', value: '5' },
          ],
          admin: {
            condition: (_, { enabled }) => enabled,
          },
        },
        {
          name: 'opacity',
          type: 'select',
          label: 'Separator Opacity',
          defaultValue: '100',
          options: [
            { label: '100%', value: '100' },
            { label: '90%', value: '90' },
            { label: '80%', value: '80' },
            { label: '70%', value: '70' },
            { label: '60%', value: '60' },
            { label: '50%', value: '50' },
            { label: '40%', value: '40' },
            { label: '30%', value: '30' },
            { label: '20%', value: '20' },
            { label: '10%', value: '10' },
          ],
          admin: {
            condition: (_, { enabled }) => enabled,
          },
        },
        {
          name: 'margin',
          type: 'select',
          label: 'Separator Margin',
          defaultValue: '8',
          options: [
            { label: 'None', value: '0' },
            { label: 'Small (1rem)', value: '4' },
            { label: 'Medium (2rem)', value: '8' },
            { label: 'Large (3rem)', value: '12' },
            { label: 'Extra Large (4rem)', value: '16' },
            { label: 'Huge (5rem)', value: '20' },
            { label: 'Gigantic (6rem)', value: '24' },
            { label: 'Massive (8rem)', value: '32' },
            { label: 'Colossal (10rem)', value: '40' },
            { label: 'Enormous (12rem)', value: '48' },
            { label: 'Titanic (16rem)', value: '64' },
            { label: 'Cosmic (20rem)', value: '80' },
            { label: 'Galactic (24rem)', value: '96' },
            { label: 'Universal (32rem)', value: '128' },
          ],
          admin: {
            condition: (_, { enabled }) => enabled,
          },
        },
      ],
    },
  ],
}
