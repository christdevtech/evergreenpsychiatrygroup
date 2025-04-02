import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Testimonials: CollectionConfig<'testimonials'> = {
  slug: 'testimonials',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Client Name',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Client Photo',
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      label: 'Rating (1-5)',
    },
    {
      name: 'testimony',
      type: 'richText',
      required: true,
      label: 'Testimonial Content',
    },
  ],
}
