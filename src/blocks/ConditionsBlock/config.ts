import type { Block } from 'payload'

import { link } from '../../fields/link'
import { bgColorPickerAll } from '@/fields/bgColorPicker'

export const ConditionsBlock: Block = {
  slug: 'conditionsBlock',
  interfaceName: 'ConditionsBlock',
  fields: [
    {
      name: 'leftColumn',
      type: 'group',
      label: 'Left Column',
      fields: [
        bgColorPickerAll({
          overrides: {
            name: 'backgroundColor',
            label: 'Background Color',
            defaultValue: 'bg-special-400',
          },
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'Conditions we treat',
        },
        {
          name: 'conditions',
          type: 'array',
          label: 'Conditions',
          minRows: 1,
          fields: [
            {
              name: 'condition',
              type: 'text',
              required: true,
              label: 'Condition',
            },
          ],
          defaultValue: [
            {
              condition: 'ADHD',
              id: '67bf1534953b9c54b54e91b2',
            },

            {
              condition: 'Depression',
              id: '67bf1542953b9c54b54e91b5',
            },

            {
              condition: 'Generalized Anxiety',
              id: '67bf1549953b9c54b54e91b7',
            },

            {
              condition: 'Acute Stress Disorder/PTSD',
              id: '67bf1550953b9c54b54e91b9',
            },

            {
              condition: 'Obsessive-Compulsive Disorder',
              id: '67bf1554953b9c54b54e91bb',
            },

            {
              condition: 'Social Anxiety',
              id: '67bf1562953b9c54b54e91bd',
            },

            {
              condition: 'Panic Disorder',
              id: '67bf156a953b9c54b54e91bf',
            },

            {
              condition: 'Mood Disorders',
              id: '67bf156e953b9c54b54e91c1',
            },
          ],
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            label: 'Call to Action Button',
            defaultValue: {
              type: 'custom',
              url: '#',
              label: 'Make an appointment',
              appearance: 'default',
            },
          },
        }),
        link({
          appearances: false,
          overrides: {
            name: 'moreLink',
            label: 'More Button',
            defaultValue: {
              type: 'custom',
              url: '/services',
              label: 'And more',
            },
          },
        }),
      ],
    },
    {
      name: 'rightColumn',
      type: 'group',
      label: 'Right Column',
      fields: [
        bgColorPickerAll({
          overrides: {
            name: 'backgroundColor',
            label: 'Background Color',
            defaultValue: 'bg-berylgreen-500',
          },
        }),
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          defaultValue: 'Benefits of choosing Evergreen Psychiatry',
        },
        {
          name: 'benefits',
          type: 'array',
          label: 'Benefits',
          minRows: 1,
          fields: [
            {
              name: 'benefit',
              type: 'text',
              required: true,
              label: 'Benefit',
            },
          ],
          defaultValue: [
            {
              benefit:
                'A practical, goals-based approach to managing your thoughts, feelings and behaviours',
              id: '67bf158c953b9c54b54e91c3',
            },

            {
              benefit: 'Fast access to treatment when you need it',
              id: '67bf1595953b9c54b54e91c5',
            },

            {
              benefit: 'Accredited and highly experienced mental health providers and therapists. ',
              id: '67bf159c953b9c54b54e91c7',
            },

            {
              benefit:
                'Suitable for treating low mood, depression, anxiety, stress, panic attacks, PTSD, OCD and phobias',
              id: '67bf15a3953b9c54b54e91c9',
            },
          ],
        },
      ],
    },
  ],
  labels: {
    plural: 'Conditions Blocks',
    singular: 'Conditions Block',
  },
}
