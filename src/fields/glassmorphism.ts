import type { Field } from 'payload'
import deepMerge from '@/utilities/deepMerge'

type GlassmorphismOptions = {
  overrides?: Record<string, unknown>
  condition?: (_: any, siblingData: any) => boolean
}

export const glassmorphismField = (options?: GlassmorphismOptions): Field => {
  const { overrides = {}, condition } = options || {}

  const glassField: Field = {
    name: 'glassmorphism',
    type: 'group',
    label: 'Glassmorphism Effect',
    admin: {
      description: 'Configure the glassmorphism effect for the content',
      condition,
    },
    fields: [
      {
        name: 'enabled',
        type: 'checkbox',
        label: 'Enable Glassmorphism',
        defaultValue: true,
      },
      {
        name: 'bgOpacity',
        type: 'select',
        label: 'Background Opacity',
        defaultValue: 'bg-white/30',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Control the transparency of the glass effect',
        },
        options: [
          { label: 'White 10%', value: 'bg-white/10' },
          { label: 'White 20%', value: 'bg-white/20' },
          { label: 'White 30%', value: 'bg-white/30' },
          { label: 'White 40%', value: 'bg-white/40' },
          { label: 'White 50%', value: 'bg-white/50' },
          { label: 'White 60%', value: 'bg-white/60' },
          { label: 'White 70%', value: 'bg-white/70' },
          { label: 'White 75%', value: 'bg-white/75' },
          { label: 'White 80%', value: 'bg-white/80' },
          { label: 'White 90%', value: 'bg-white/90' },
          { label: 'Black 10%', value: 'bg-black/10' },
          { label: 'Black 20%', value: 'bg-black/20' },
          { label: 'Black 30%', value: 'bg-black/30' },
          { label: 'Black 40%', value: 'bg-black/40' },
          { label: 'Black 50%', value: 'bg-black/50' },
          { label: 'Black 60%', value: 'bg-black/60' },
          { label: 'Black 70%', value: 'bg-black/70' },
          { label: 'Black 75%', value: 'bg-black/75' },
          { label: 'Black 80%', value: 'bg-black/80' },
          { label: 'Black 90%', value: 'bg-black/90' },
          { label: 'Green 50 10%', value: 'bg-green-50/10' },
          { label: 'Green 50 20%', value: 'bg-green-50/20' },
          { label: 'Green 50 50%', value: 'bg-green-50/50' },
          { label: 'Green 50 75%', value: 'bg-green-50/75' },
          { label: 'Green 100 10%', value: 'bg-green-100/10' },
          { label: 'Green 100 20%', value: 'bg-green-100/20' },
          { label: 'Green 100 50%', value: 'bg-green-100/50' },
          { label: 'Green 100 75%', value: 'bg-green-100/75' },
          { label: 'Green 200 10%', value: 'bg-green-200/10' },
          { label: 'Green 200 20%', value: 'bg-green-200/20' },
          { label: 'Green 200 50%', value: 'bg-green-200/50' },
          { label: 'Green 200 75%', value: 'bg-green-200/75' },
          //teal 700 options
          { label: 'Teal 700 10%', value: 'bg-teal-700/10' },
          { label: 'Teal 700 20%', value: 'bg-teal-700/20' },
          { label: 'Teal 700 30%', value: 'bg-teal-700/30' },
          { label: 'Teal 700 40%', value: 'bg-teal-700/40' },
          { label: 'Teal 700 50%', value: 'bg-teal-700/50' },
          { label: 'Teal 700 60%', value: 'bg-teal-700/60' },
          { label: 'Teal 700 70%', value: 'bg-teal-700/70' },
          { label: 'Teal 700 80%', value: 'bg-teal-700/80' },
          { label: 'Teal 700 90%', value: 'bg-teal-700/90' },
          { label: 'Teal 700 100%', value: 'bg-teal-700/100' },
        ],
      },
      {
        name: 'backdropBlur',
        type: 'select',
        label: 'Blur Amount',
        defaultValue: 'backdrop-blur-2xl',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Control the blur intensity of the glass effect',
        },
        options: [
          { label: 'None', value: 'backdrop-blur-none' },
          { label: 'Extra Small', value: 'backdrop-blur-xs' },
          { label: 'Small', value: 'backdrop-blur-sm' },
          { label: 'Medium', value: 'backdrop-blur-md' },
          { label: 'Large', value: 'backdrop-blur-lg' },
          { label: 'Extra Large', value: 'backdrop-blur-xl' },
          { label: '2XL', value: 'backdrop-blur-2xl' },
          { label: '3XL', value: 'backdrop-blur-3xl' },
        ],
      },
      {
        name: 'borderRadius',
        type: 'select',
        label: 'Border Radius',
        defaultValue: 'rounded-lg',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Control the roundness of the glass container',
        },
        options: [
          { label: 'None', value: 'rounded-none' },
          { label: 'Small', value: 'rounded-sm' },
          { label: 'Medium', value: 'rounded-md' },
          { label: 'Large', value: 'rounded-lg' },
          { label: 'Extra Large', value: 'rounded-xl' },
          { label: '2XL', value: 'rounded-2xl' },
          { label: '3XL', value: 'rounded-3xl' },
          { label: 'Full', value: 'rounded-full' },
        ],
      },
      {
        name: 'border',
        type: 'select',
        label: 'Border Style',
        defaultValue: 'border border-white/30',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Add a border to the glass container',
        },
        options: [
          { label: 'None', value: '' },
          { label: 'White 10%', value: 'border border-white/10' },
          { label: 'White 20%', value: 'border border-white/20' },
          { label: 'White 30%', value: 'border border-white/30' },
          { label: 'White 50%', value: 'border border-white/50' },
          { label: 'Black 10%', value: 'border border-black/10' },
          { label: 'Black 20%', value: 'border border-black/20' },
          { label: 'Black 30%', value: 'border border-black/30' },
          { label: 'Black 50%', value: 'border border-black/50' },
          { label: 'Green 100 20%', value: 'border border-green-100/20' },
          { label: 'Green 200 20%', value: 'border border-green-200/20' },
          { label: 'Green 300 20%', value: 'border border-green-300/20' },
          { label: 'Green 400 20%', value: 'border border-green-400/20' },
        ],
      },
      {
        name: 'shadow',
        type: 'select',
        label: 'Shadow',
        defaultValue: 'shadow-2xl',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Add a shadow to the glass container',
        },
        options: [
          { label: 'None', value: '' },
          { label: 'Small', value: 'shadow-sm' },
          { label: 'Medium', value: 'shadow-md' },
          { label: 'Large', value: 'shadow-lg' },
          { label: 'Extra Large', value: 'shadow-xl' },
          { label: '2XL', value: 'shadow-2xl' },
        ],
      },
      {
        name: 'padding',
        type: 'select',
        label: 'Padding',
        defaultValue: 'p-12',
        admin: {
          condition: (_, siblingData) => siblingData?.enabled,
          description: 'Add padding to the glass container',
        },
        options: [
          { label: 'None', value: 'p-0' },
          { label: 'Extra Small', value: 'p-2' },
          { label: 'Small', value: 'p-4' },
          { label: 'Medium', value: 'p-6' },
          { label: 'Large', value: 'p-8' },
          { label: 'Extra Large', value: 'p-10' },
          { label: '2XL', value: 'p-12' },
          { label: '3XL', value: 'p-16' },
        ],
      },
    ],
  }

  return deepMerge(glassField, overrides) as Field
}
