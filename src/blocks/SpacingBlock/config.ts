import { bgColorPickerAll } from '@/fields/bgColorPicker'
import { Block } from 'payload'

export const SpacingBlock: Block = {
  slug: 'spacing',
  interfaceName: 'SpacingBlock',
  labels: {
    plural: 'Spacing',
    singular: 'Spacing',
  },
  fields: [
    {
      name: 'spacing',
      type: 'select',
      required: true,
      hasMany: true,
      options: [
        {
          label: 'None',
          value: 'pb-0',
        },
        {
          label: 'Small',
          value: 'pb-4',
        },
        {
          label: 'Medium',
          value: 'pb-8',
        },
        {
          label: 'Large',
          value: 'pb-16',
        },
        {
          label: 'XLarge',
          value: 'pb-24',
        },
        {
          label: 'XXLarge',
          value: 'pb-32',
        },
        {
          label: 'XXXLarge',
          value: 'pb-40',
        },
        // add options for different screen sizes
        {
          label: 'md:None',
          value: 'md:pb-0',
        },
        {
          label: 'md:Small',
          value: 'md:pb-4',
        },
        {
          label: 'md:Medium',
          value: 'md:pb-8',
        },
        {
          label: 'md:Large',
          value: 'md:pb-16',
        },
        {
          label: 'md:XLarge',
          value: 'md:pb-24',
        },

        {
          label: 'md:XXLarge',
          value: 'md:pb-32',
        },
        {
          label: 'md:XXXLarge',
          value: 'md:pb-40',
        },
        // LG options
        {
          label: 'lg:None',
          value: 'lg:pb-0',
        },
        {
          label: 'lg:Small',
          value: 'lg:pb-4',
        },
        {
          label: 'lg:Medium',
          value: 'lg:pb-8',
        },
        {
          label: 'lg:Large',
          value: 'lg:pb-16',
        },
        {
          label: 'lg:XLarge',
          value: 'lg:pb-24',
        },
        {
          label: 'lg:XXLarge',
          value: 'lg:pb-32',
        },
        {
          label: 'lg:XXXLarge',
          value: 'lg:pb-40',
        },
        // XL options
        {
          label: 'xl:None',
          value: 'xl:pb-0',
        },
        {
          label: 'xl:Small',
          value: 'xl:pb-4',
        },
        {
          label: 'xl:Medium',
          value: 'xl:pb-8',
        },
        {
          label: 'xl:Large',
          value: 'xl:pb-16',
        },
        {
          label: 'xl:XLarge',
          value: 'xl:pb-24',
        },
        {
          label: 'xl:XXLarge',
          value: 'xl:pb-32',
        },
        {
          label: 'xl:XXXLarge',
          value: 'xl:pb-40',
        },
        // 2XL options
        {
          label: '2xl:None',
          value: '2xl:pb-0',
        },
        {
          label: '2xl:Small',
          value: '2xl:pb-4',
        },
        {
          label: '2xl:Medium',
          value: '2xl:pb-8',
        },
        {
          label: '2xl:Large',
          value: '2xl:pb-16',
        },
        {
          label: '2xl:XLarge',
          value: '2xl:pb-24',
        },
        {
          label: '2xl:XXLarge',
          value: '2xl:pb-32',
        },
        {
          label: '2xl:XXXLarge',
          value: '2xl:pb-40',
        },
      ],
    },
    bgColorPickerAll({
      overrides: {
        defaultValue: 'bg-transparent',
      },
    }),
  ],
}
