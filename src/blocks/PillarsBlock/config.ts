import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'

export const PillarsBlock: Block = {
  slug: 'pillarsBlock',
  interfaceName: 'PillarsBlock',
  fields: [
    bgColorPickerAll({
      overrides: {
        name: 'backgroundColor',
        label: 'Background Color',
        defaultValue: 'bg-teal-700',
      },
    }),
    bgColorPickerAll({
      overrides: {
        name: 'circleBackgroundColor',
        label: 'Circle Background Color',
        defaultValue: 'bg-cyan-200',
      },
    }),
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
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      defaultValue: 'Our Six Pillars',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Text Classes',
        defaultValue: ['text-4xl', 'md:text-5xl', 'font-bold', 'mb-6', 'text-white'],
      },
    }),
    {
      name: 'description',
      type: 'richText',
      label: 'Description',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            LinkFeature(),
          ]
        },
      }),
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
                  text: 'At Evergreen Psychiatry Group, our philosophy is rooted in these core beliefs:',
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
        name: 'descriptionClasses',
        label: 'Description Text Classes',
        defaultValue: ['text-xl', 'md:text-2xl', 'mb-8', 'text-white'],
      },
    }),
    {
      name: 'items',
      type: 'array',
      label: 'Pillar Items',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Item Title',
          defaultValue: 'Mental Health Matters',
        },
        {
          name: 'text',
          type: 'richText',
          label: 'Item Text',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
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
                      text: 'Mental well-being is a vital part of overall health and deserves equal care and attention.',
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
      ],
    },
    textClasses({
      overrides: {
        name: 'itemTitleClasses',
        label: 'Item Title Text Classes',
        defaultValue: ['text-2xl', 'font-medium', 'mb-8', 'text-white'],
      },
    }),
    textClasses({
      overrides: {
        name: 'itemTextClasses',
        label: 'Item Text Classes',
        defaultValue: ['text-base', 'text-white'],
      },
    }),
  ],
  labels: {
    plural: 'Pillars Blocks',
    singular: 'Pillars Block',
  },
}
