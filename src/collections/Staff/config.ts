import { Banner } from '@/blocks/Banner/config'
import { Code } from '@/blocks/Code/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import { revalidateDelete, revalidateStaff } from './hooks/revalidateStaff'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Staff: CollectionConfig<'staff'> = {
  slug: 'staff',

  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    specialties: true,
    locations: true,
    image: true,
    description: true,
    role: true,
    position: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'staff',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'staff',
        req,
      }),
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Leader', value: 'leader' },
        { label: 'Therapist', value: 'therapist' },
        { label: 'Provider', value: 'provider' },
      ],
      defaultValue: 'therapist',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
          ]
        },
      }),
    },
    {
      name: 'specialties',
      type: 'relationship',
      relationTo: 'specialties',
      hasMany: true,
      admin: {
        condition: (_, { role }) => ['provider', 'therapist'].includes(role),
      },
    },
    {
      name: 'locations',
      type: 'relationship',
      relationTo: 'locations',
      hasMany: true,
      admin: {
        condition: (_, { role }) => ['provider', 'therapist'].includes(role),
      },
    },
    ...slugField('name'),
  ],
  hooks: {
    afterChange: [revalidateStaff],
    afterDelete: [revalidateDelete],
  },
}
