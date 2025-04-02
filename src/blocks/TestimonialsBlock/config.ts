import type { Block } from 'payload'
import { textClasses } from '@/fields/textClasses'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const TestimonialsBlock: Block = {
  slug: 'testimonialsBlock',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Hear from our clients',
      label: 'Block Title',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        defaultValue: ['text-3xl', 'md:text-4xl', 'lg:text-5xl', 'font-bold', 'mb-8'],
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'blockBGColor',
        label: 'Block Background Color',
        defaultValue: 'bg-white',
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'testimonialBGColor',
        label: 'Testimonial Background Color',
        defaultValue: 'bg-white',
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },

    {
      name: 'testimonials',
      type: 'relationship',
      hasMany: true,
      relationTo: 'testimonials',
      required: true,
      minRows: 1,
      label: 'Select Testimonials',
      admin: {
        description: 'Add testimonials to display in the carousel',
      },
    },
  ],
  labels: {
    plural: 'Testimonials Blocks',
    singular: 'Testimonials Block',
  },
}
