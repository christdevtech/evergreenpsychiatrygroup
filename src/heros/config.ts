import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { gradientClasses } from '@/fields/gradientClasses'
import { textClasses } from '@/fields/textClasses'
import { glassmorphismField } from '@/fields/glassmorphism'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
        {
          label: 'Glass Morph',
          value: 'glassMorph',
        },
        {
          label: 'Simple Hero',
          value: 'simpleHero',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Healing, Growth, Transformation',
      admin: {
        description: 'The main title of the hero section',
        condition: (_, { type }) => ['simpleHero'].includes(type),
      },
    },
    textClasses({
      condition: (_, { type }) =>
        ['glassMorph', 'highImpact', 'mediumImpact', 'lowImpact', 'simpleHero'].includes(type),
      overrides: {
        name: 'titleClasses',
        label: 'Title Styling',
        defaultValue: [
          'text-green-950',
          'text-3xl',
          'md:text-4xl',
          'font-bold',
          'leading-relaxed',
          'mb-12',
        ],
      },
    }),
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'Comprehensive mental health services that nurture change and well-being',
      admin: {
        description: 'The subtitle text below the main title',
        condition: (_, { type }) =>
          ['glassMorph', 'highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'subtitleClasses',
        label: 'Subtitle Styling',
        defaultValue: [
          'text-green-800',
          'text-3xl',
          'md:text-4xl',
          'font-bold',
          'leading-relaxed',
          'mb-12',
        ],
      },
      condition: (_, { type }) =>
        ['glassMorph', 'highImpact', 'mediumImpact', 'lowImpact'].includes(type),
    }),
    {
      name: 'richText',
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
      label: false,
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
                  text: 'See an expert in an little as 48 hours',
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
      admin: {
        condition: (_, { type }) =>
          ['glassMorph', 'highImpact', 'mediumImpact', 'lowImpact'].includes(type),
      },
    },
    textClasses({
      overrides: {
        name: 'richTextClasses',
        label: 'Rich Text Styling',
        defaultValue: ['text-green-800', 'text-2xl', 'md:text-3xl', 'leading-relaxed', 'mb-12'],
      },
      condition: (_, { type } = {}) =>
        ['lowImpact', 'mediumImpact', 'highImpact', 'glassMorph'].includes(type),
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (data: any, { type }: { type?: string } = {}) =>
          ['highImpact', 'mediumImpact', 'glassMorph', 'simpleHero'].includes(type || ''),
      },
      relationTo: 'media',
      required: true,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
        admin: {
          condition: (_, { type } = {}) =>
            ['highImpact', 'mediumImpact', 'glassMorph', 'simpleHero'].includes(type),
        },
      },
    }),
    glassmorphismField({
      condition: (_, { type }) => ['glassMorph'].includes(type),
    }),
    textClasses({
      condition: (_, { type }) => ['glassMorph'].includes(type),
      overrides: {
        name: 'mobileSpacing',
        label: 'Mobile Spacing',
        defaultValue: ['mb-32', 'mt-40', 'md:mt-16', 'md:mb-16'],
        admin: {
          description: 'Configure spacing for mobile view',
        },
      },
    }),
    gradientClasses({
      overrides: {
        name: 'heroBgGradient',
        label: 'Hero Background Gradient',
      },
      condition: (data: any, { type }: { type?: string } = {}) =>
        ['highImpact'].includes(type || ''),
    }),
  ],
  label: false,
}
