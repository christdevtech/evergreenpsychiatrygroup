import { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const StaffBlock: Block = {
  slug: 'staff',
  interfaceName: 'StaffBlock',

  fields: [
    {
      name: 'padding',
      type: 'select',
      label: 'Section Padding',
      defaultValue: 'py-16 md:py-24',
      options: [
        { label: 'Small', value: 'py-8 md:py-12' },
        { label: 'Medium', value: 'py-16 md:py-24' },
        { label: 'Large', value: 'py-24 md:py-32' },
      ],
    },
    bgColorPickerAll({
      overrides: {
        name: 'sectionBGColor',
        label: 'Section Background Color',
        defaultValue: 'bg-white',
        required: true,
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'cardBGColor',
        label: 'Card Background Color',
        defaultValue: 'bg-slate-100',
        required: true,
      },
    }),
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Meet our Providers',
    },
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
      defaultValue: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Our board certified prescribers will work with you to tailor your medications to your needs and diagnosis. We see patients of all ages including paediatrics, adolescents, adults, and seniors.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      options: [
        { label: 'Collection', value: 'collection' },
        { label: 'Individual Selection', value: 'selection' },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'staff',
      label: 'Collections To Show',
      options: [{ label: 'Staff', value: 'staff' }],
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      label: 'Roles To Show',
      options: [
        { label: 'Leader', value: 'leader' },
        { label: 'Provider', value: 'provider' },
        { label: 'Therapist', value: 'therapist' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 10,
      label: 'Limit',
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      relationTo: ['staff'],
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: 'Selection',
    },
    {
      name: 'seeMoreLink',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show See More Link',
    },
    link({
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.seeMoreLink === true,
        },
      },
    }),
  ],
  labels: {
    plural: 'Staff Blocks',
    singular: 'Staff Block',
  },
}
