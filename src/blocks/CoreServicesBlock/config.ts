import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { link } from '@/fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const CoreServicesBlock: Block = {
  slug: 'coreServicesBlock',
  interfaceName: 'CoreServicesBlock',
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
    {
      name: 'isConditions',
      type: 'checkbox',
      label: 'Is Conditions',
      defaultValue: false,
      admin: {
        description: 'Select this if the block is for conditions we treat',
      },
    },
    bgColorPickerAll({
      overrides: {
        name: 'conditionBGColor',
        label: 'Conditions Background Color',
        defaultValue: 'bg-berylgreen-500',
      },
      condition: (_, { isConditions }) => isConditions === true,
    }),
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Block Title',
      defaultValue: 'Our Core Services',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-3xl', 'md:text-4xl', 'font-semibold', 'mb-8'],
      },
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Block Description',
      defaultValue:
        'Evergreen pychiatry brings you fast, confidential access to talking therapy through convenient video or telephone consultations.',
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        defaultValue: ['text-lg', 'mb-10'],
      },
    }),
    textClasses({
      overrides: {
        name: 'serviceHeadingClasses',
        label: 'Service Heading Classes',
        admin: {
          description: 'These classes will be applied to all service headings',
        },
        defaultValue: ['text-2xl', 'md:text-3xl', 'font-semibold'],
      },
    }),
    textClasses({
      overrides: {
        name: 'serviceTextClasses',
        label: 'Service Text Classes',
        admin: {
          description: 'These classes will be applied to all service descriptions',
        },
        defaultValue: ['text-lg', 'md:text-xl', 'lg:text-2xl'],
      },
    }),
    buttonClasses({
      overrides: {
        name: 'serviceLinkClasses',
        label: 'Service Link Button Classes',
        admin: {
          description: 'These classes will be applied to all service links',
        },
        defaultValue: ['px-6', 'py-3', 'rounded-xl', 'bg-special-500', 'text-white', 'text-lg'],
      },
    }),
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add core services to display in tabs',
        condition: (_, { isConditions }) => isConditions !== true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Service Heading',
          defaultValue: 'Medication Management',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Service Description',
          defaultValue:
            'Evergreen Psychiatry Group brings you fast, confidential access to vital mental health care through convenient  in-person or video consultations with highly experienced and accredited mental health practitioners and therapists.',
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
    {
      name: 'conditions',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add core services to display in tabs',
        condition: (_, { isConditions }) => isConditions === true,
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Condition Heading',
          defaultValue: 'ADHD',
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Condition Description',
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
