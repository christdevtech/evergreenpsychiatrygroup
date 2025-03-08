import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const EmergenciesBlock: Block = {
  slug: 'emergenciesBlock',
  interfaceName: 'EmergenciesBlock',
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
        name: 'backgroundColor',
        label: 'Background Color',
        defaultValue: 'bg-teal-600',
      },
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Emergencies',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-4xl', 'font-semibold', 'text-white', 'md:text-center', 'mb-12'],
      },
    }),
    {
      name: 'mainText',
      type: 'richText',
      required: true,
      label: 'Main Text',
    },
    textClasses({
      overrides: {
        name: 'mainTextClasses',
        defaultValue: [
          'text-xl',
          'md:text-2xl',
          'text-white',
          'md:text-center',
          'mb-16',
          'lg:w-7/10',
          'w-4/5',
        ],
      },
    }),
    {
      name: 'emergencyCases',
      type: 'group',
      label: 'Emergency Cases',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'Sample Emergency Cases',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            defaultValue: ['text-xl', 'md:text-2xl', 'lg:text-3xl', 'font-semibold', 'text-white'],
          },
        }),
        {
          name: 'cases',
          type: 'array',
          required: true,
          minRows: 1,
          label: 'Cases',
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
              label: 'Case Text',
            },
          ],
        },
      ],
    },
    {
      name: 'suicideHotline',
      type: 'group',
      label: 'Suicide Prevention Hotline',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'National Suicide Prevention Lifeline',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            defaultValue: ['text-xl', 'md:text-2xl', 'lg:text-3xl', 'font-semibold', 'text-white'],
          },
        }),
        {
          name: 'phoneNumbers',
          type: 'array',
          required: true,
          minRows: 1,
          label: 'Phone Numbers',
          fields: [
            {
              name: 'number',
              type: 'text',
              required: true,
              label: 'Phone Number',
            },
          ],
        },
      ],
    },
  ],
}
