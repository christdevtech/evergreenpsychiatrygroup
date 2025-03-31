import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { buttonClasses } from '@/fields/buttonClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { linkGroup } from '@/fields/linkGroup'

export const ServiceTabsBlock: Block = {
  slug: 'serviceTabsBlock',
  interfaceName: 'ServiceTabsBlock',
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
        defaultValue: 'bg-cyan-50',
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'buttonBGColor',
        label: 'Active Button Background Color',
        defaultValue: 'bg-white',
      },
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
        defaultValue: ['text-3xl', 'md:text-4xl', 'font-semibold'],
      },
    }),
    {
      name: 'description',
      type: 'textarea',
      label: 'Block Description',
      defaultValue: 'Book an appointment with one of our providers',
    },
    textClasses({
      overrides: {
        name: 'descriptionClasses',
        defaultValue: [
          'text-white',
          'mb-10',
          'text-lg',
          'md:text-xl',
          'lg:text-2xl',
          'xl:text-3xl',
          'font-bold',
        ],
      },
    }),
    textClasses({
      overrides: {
        name: 'serviceHeadingClasses',
        label: 'Service Heading Classes',
        admin: {
          description: 'These classes will be applied to all service headings',
        },
        defaultValue: ['text-2xl', 'md:text-3xl', 'font-semibold', 'mb-4'],
      },
    }),
    textClasses({
      overrides: {
        name: 'serviceTextClasses',
        label: 'Service Text Classes',
        admin: {
          description: 'These classes will be applied to all service descriptions',
        },
        defaultValue: ['text-lg', 'md:text-xl'],
      },
    }),
    buttonClasses({
      overrides: {
        name: 'serviceLinkClasses',
        label: 'Service Link Button Classes',
        admin: {
          description: 'These classes will be applied to all service links',
        },
        defaultValue: ['px-6', 'py-3', 'mt-6', 'rounded-xl', 'bg-special-500', 'text-white'],
      },
    }),
    buttonClasses({
      overrides: {
        name: 'tabButtonClasses',
        label: 'Tab Button Classes',
        admin: {
          description: 'These classes will be applied to service tab buttons',
        },
        defaultValue: ['py-4', 'px-6', 'rounded-full', 'text-xl'],
      },
    }),
    {
      name: 'services',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Add services to display in tabs',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Service Heading',
          defaultValue: 'Diagnostic Evaluation',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Service Description',
          defaultValue:
            "A diagnostic evaluation is critical to ensure that patients receive appropriate care, and it serves as the foundation for developing a tailored treatment plan. Our expert providers, utilize this process to identify psychiatric disorders, guide treatment planning, and provide insights into the patient's symptoms, history, and functioning.",
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
        linkGroup({ appearances: false }),
      ],
    },
  ],
}
