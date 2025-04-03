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
      { label: 'Small', value: 'pb-4' },
      { label: 'Medium', value: 'pb-8' },
      { label: 'Large', value: 'pb-16' },
      { label: 'XLarge', value: 'pb-24' },
      { label: 'XXLarge', value: 'pb-32' },
      { label: 'XXXLarge', value: 'pb-40' },
      // add options for different screen sizes
      { label: 'md:None', value: 'md:pb-0' },
      { label: 'md:Small', value: 'md:pb-4' },
      { label: 'md:Medium', value: 'md:pb-8' },
      { label: 'md:Large', value: 'md:pb-16' },
      { label: 'md:XLarge', value: 'md:pb-24' },

      { label: 'md:XXLarge', value: 'md:pb-32' },
      { label: 'md:XXXLarge', value: 'md:pb-40' },
      // LG options
      { label: 'lg:None', value: 'lg:pb-0' },
      { label: 'lg:Small', value: 'lg:pb-4' },
      { label: 'lg:Medium', value: 'lg:pb-8' },
      { label: 'lg:Large', value: 'lg:pb-16' },
      { label: 'lg:XLarge', value: 'lg:pb-24' },
      { label: 'lg:XXLarge', value: 'lg:pb-32' },
      { label: 'lg:XXXLarge', value: 'lg:pb-40' },
      // XL options
      { label: 'xl:None', value: 'xl:pb-0' },
      { label: 'xl:Small', value: 'xl:pb-4' },
      { label: 'xl:Medium', value: 'xl:pb-8' },
      { label: 'xl:Large', value: 'xl:pb-16' },
      { label: 'xl:XLarge', value: 'xl:pb-24' },
      { label: 'xl:XXLarge', value: 'xl:pb-32' },
      { label: 'xl:XXXLarge', value: 'xl:pb-40' },
      // 2XL options
      { label: '2xl:None', value: '2xl:pb-0' },
      { label: '2xl:Small', value: '2xl:pb-4' },
      { label: '2xl:Medium', value: '2xl:pb-8' },
      { label: '2xl:Large', value: '2xl:pb-16' },
      { label: '2xl:XLarge', value: '2xl:pb-24' },
      { label: '2xl:XXLarge', value: '2xl:pb-32' },
      { label: '2xl:XXXLarge', value: '2xl:pb-40' },
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
          label: 'Flex Direction',
          fields: [
            {
              name: 'flexDirection',
              type: 'group',
              label: 'Flex Direction',
              fields: [
                {
                  name: 'mobile',
                  type: 'select',
                  defaultValue: 'row',
                  options: [
                    {
                      label: 'Row (Left to Right)',
                      value: 'row',
                    },
                    {
                      label: 'Row Reverse (Right to Left)',
                      value: 'row-reverse',
                    },
                    {
                      label: 'Column (Top to Bottom)',
                      value: 'column',
                    },
                    {
                      label: 'Column Reverse (Bottom to Top)',
                      value: 'column-reverse',
                    },
                  ],
                },
                {
                  name: 'desktop',
                  type: 'select',
                  defaultValue: 'row',
                  options: [
                    {
                      label: 'Row (Left to Right)',
                      value: 'row',
                    },
                    {
                      label: 'Row Reverse (Right to Left)',
                      value: 'row-reverse',
                    },
                    {
                      label: 'Column (Top to Bottom)',
                      value: 'column',
                    },
                    {
                      label: 'Column Reverse (Bottom to Top)',
                      value: 'column-reverse',
                    },
                  ],
                },
              ],
            },
          ],
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
