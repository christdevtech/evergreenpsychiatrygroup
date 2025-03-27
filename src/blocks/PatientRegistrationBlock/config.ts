import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PatientRegistrationBlock: Block = {
  slug: 'patientRegistrationBlock',
  interfaceName: 'PatientRegistrationBlock',
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
        name: 'blockBGColor',
        label: 'Block Background Color',
        defaultValue: 'bg-slate-50',
      },
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Block Title',
      defaultValue: 'Patient Registration',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-3xl', 'md:text-4xl', 'font-semibold', 'mb-8', 'text-center'],
      },
    }),
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Block Subtitle',
      defaultValue:
        'At Evergreen Psychiatry Group, we are dedicated to using cutting edge methods to help you achieve lasting results.',
    },
    textClasses({
      overrides: {
        name: 'subtitleClasses',
        defaultValue: ['text-lg', 'md:text-xl', 'lg:text-2xl', 'mb-10', 'text-center', 'mx-auto'],
      },
    }),
    textClasses({
      overrides: {
        name: 'optionTitleClasses',
        label: 'Option Title Classes',
        admin: {
          description: 'These classes will be applied to all option titles',
        },
        defaultValue: ['text-2xl', 'md:text-3xl', 'font-semibold'],
      },
    }),
    textClasses({
      overrides: {
        name: 'optionContentClasses',
        label: 'Option Content Classes',
        admin: {
          description: 'These classes will be applied to all option content',
        },
        defaultValue: ['text-lg', 'md:text-xl'],
      },
    }),
    buttonClasses({
      overrides: {
        name: 'optionLinkClasses',
        label: 'Option Link Button Classes',
        admin: {
          description: 'These classes will be applied to all option links',
        },
        defaultValue: ['px-6', 'py-3', 'rounded-xl', 'bg-teal-600', 'text-white', 'text-lg'],
      },
    }),
    {
      name: 'patientOptions',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add patient registration options to display in tabs',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Option Title',
          defaultValue: 'New Patients',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
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
        },
        {
          name: 'media',
          type: 'group',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },

        link({ appearances: false }),
      ],
    },
  ],
}
