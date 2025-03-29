import type { Block } from 'payload'

import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { textClasses } from '@/fields/textClasses'

export const ConditionsTreatedBlock: Block = {
  slug: 'conditionsTreatedBlock',
  interfaceName: 'ConditionsTreatedBlock',
  fields: [
    bgColorPickerAll({
      overrides: {
        name: 'backgroundColor',
        label: 'Background Color',
        defaultValue: 'bg-teal-700',
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
      defaultValue: 'Additional conditions we treat',
    },
    textClasses({
      overrides: {
        name: 'titleClasses',
        label: 'Title Text Classes',
        defaultValue: ['text-4xl', 'md:text-5xl', 'font-bold', 'mb-8', 'text-white', 'text-center'],
      },
    }),
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      defaultValue:
        'At Evergreen Psychiatry we extend our care to a broader range of mental health conditions to support your mental wellbeing.',
    },
    textClasses({
      overrides: {
        name: 'subtitleClasses',
        label: 'Subtitle Text Classes',
        defaultValue: ['text-xl', 'md:text-2xl', 'mb-16', 'text-white', 'text-center', 'mx-auto'],
      },
    }),
    {
      name: 'columns',
      type: 'group',
      label: 'Column Settings',
      fields: [
        {
          name: 'default',
          type: 'select',
          label: 'Default Columns',
          defaultValue: '2',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
        {
          name: 'sm',
          type: 'select',
          label: 'SM Columns (640px+)',
          defaultValue: '2',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
        {
          name: 'md',
          type: 'select',
          label: 'MD Columns (768px+)',
          defaultValue: '2',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
          ],
        },
        {
          name: 'lg',
          type: 'select',
          label: 'LG Columns (1024px+)',
          defaultValue: '3',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
            { label: '5 Columns', value: '5' },
          ],
        },
        {
          name: 'xl',
          type: 'select',
          label: 'XL Columns (1280px+)',
          defaultValue: '4',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
            { label: '5 Columns', value: '5' },
            { label: '6 Columns', value: '6' },
          ],
        },
        {
          name: '2xl',
          type: 'select',
          label: '2XL Columns (1536px+)',
          defaultValue: '4',
          options: [
            { label: '1 Column', value: '1' },
            { label: '2 Columns', value: '2' },
            { label: '3 Columns', value: '3' },
            { label: '4 Columns', value: '4' },
            { label: '5 Columns', value: '5' },
            { label: '6 Columns', value: '6' },
          ],
        },
      ],
    },
    {
      name: 'conditions',
      type: 'array',
      label: 'Conditions',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Condition Name',
        },
      ],
      defaultValue: [
        { name: 'Bipolar Disorder' },
        { name: 'Dementia' },
        { name: 'Borderline Personality Disorder' },
        { name: 'Autism Spectrum Disorders' },
        { name: 'Eating Disorders' },
        { name: 'Insomnia' },
        { name: 'Adjustment Disorders' },
        { name: 'Oppositional Defiant Disorder' },
        { name: 'Perinatal and postpartum mood disorders' },
        { name: 'Grief & Loss' },
        { name: 'Emotional & Cognitive Impact of chronic illness' },
        { name: 'Sleep Disorders' },
      ],
    },
    textClasses({
      overrides: {
        name: 'conditionItemClasses',
        label: 'Condition Item Classes',
        defaultValue: ['text-white', 'text-lg', 'md:text-xl', 'lg:text-2xl', 'mb-4'],
      },
    }),
  ],
  labels: {
    plural: 'Conditions Treated Blocks',
    singular: 'Conditions Treated Block',
  },
}
