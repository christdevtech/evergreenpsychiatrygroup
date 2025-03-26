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
      label: 'Intro Text',
      type: 'collapsible',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'Emergency and Support <br /> Resources',
        },
        textClasses({
          overrides: {
            name: 'titleClasses',
            defaultValue: [
              'text-3xl',
              'md:text-4xl',
              'lg:text-5xl',
              'font-semibold',
              'text-white',
              'md:text-center',
              'mb-12',
            ],
          },
        }),
        {
          name: 'mainText',
          type: 'richText',
          required: true,
          label: 'Main Text',
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
                      text: 'Evergreen Psychiatry Group offers outpatient clinic services only with limited office hours. Patients are seen on an appointment basis only. In case of an emergency, please browse our emergency resources to find a service that suits your needs. ',
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
              'mx-auto',
            ],
          },
        }),
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          defaultValue: 'Emergencies',
        },
        textClasses({
          overrides: {
            name: 'subtitleClasses',
            defaultValue: ['text-2xl', 'md:text-3xl', 'font-semibold', 'text-white', 'mb-12'],
          },
        }),
        {
          name: 'subText',
          type: 'richText',
          required: true,
          label: 'Sub Text',
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
                      text: 'Evergreen Psychiatry Group offers outpatient clinic services only with limited office hours. Patients are seen On An Appointment Basis Only. ',
                      type: 'text',
                      version: 1,
                    },

                    {
                      detail: 0,
                      format: 1,
                      mode: 'normal',
                      style: '',
                      text: 'If you are suicidal, It is important that you contact 911 and Go to the Emergency Room Immediately.',
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
        textClasses({
          overrides: {
            name: 'subTextClasses',
            defaultValue: ['text-xl', 'md:text-2xl', 'text-white', 'mb-12'],
          },
        }),
      ],
    },
    {
      type: 'collapsible',
      label: 'Data',
      fields: [
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
                defaultValue: [
                  'text-xl',
                  'md:text-2xl',
                  'lg:text-3xl',
                  'font-semibold',
                  'text-white',
                ],
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
                defaultValue: [
                  'text-xl',
                  'md:text-2xl',
                  'lg:text-3xl',
                  'font-semibold',
                  'text-white',
                ],
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
        {
          name: 'localizedResources',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              defaultValue: 'County Name',
            },
            textClasses({
              overrides: {
                name: 'titleClasses',
                defaultValue: ['text-2xl', 'md:text-3xl', 'font-semibold', 'text-white', 'mb-8'],
              },
            }),
            {
              name: 'description',
              type: 'richText',
              required: true,
              label: 'Description',
            },
            textClasses({
              overrides: {
                name: 'descriptionClasses',
                defaultValue: ['text-xl', 'md:text-2xl', 'text-white', 'font-light', 'mb-6'],
              },
            }),
            {
              name: 'resources',
              type: 'array',
              required: true,
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  required: true,
                  relationTo: 'media',
                },
                {
                  name: 'link',
                  type: 'text',
                  required: true,
                  label: 'Link',
                },
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
