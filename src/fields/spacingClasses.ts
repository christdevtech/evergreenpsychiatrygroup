import deepMerge from '@/utilities/deepMerge'
import { Field } from 'payload'
import { bgColorPickerAll } from './bgColorPicker'
import { gradientColorPicker } from './gradientColorPicker'

type SpacingClassesType = (options?: {
  overrides?: Record<string, unknown>
  condition?: (_: any, siblingData: any) => boolean
}) => Field

// Helper function to generate responsive options
const generateResponsiveOptions = (prefix: string, values: string[], label: string): Field[] => {
  const screens = ['', 'sm:', 'md:', 'lg:', 'xl:', '2xl:']
  const screenLabels = [
    'Default Screen Size',
    'Small (sm) Screen Size',
    'Medium (md) Screen Size',
    'Large (lg) Screen Size',
    'Extra Large (xl) Screen Size',
    '2XL (2xl) Screen Size',
  ]

  return screens.map((screen, index) => ({
    name: screen ? `${prefix}${screen.replace(':', '')}` : prefix,
    type: 'select' as const,
    label: `${label} ${screenLabels[index]}`,
    options: [
      { label: 'None', value: '' },
      ...values.map((value) => ({
        label: value.replace('-', ' ').replace('px', 'px ').trim(),
        value: screen ? `${screen}${prefix}-${value}` : `${prefix}-${value}`,
      })),
    ],
    admin: {
      width: '100%',
    },
  }))
}

// Generate opacity values
const opacityValues = [
  '0',
  '5',
  '10',
  '20',
  '25',
  '30',
  '40',
  '50',
  '60',
  '70',
  '75',
  '80',
  '90',
  '95',
  '100',
]

// Generate spacing values (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96)
const spacingValues = [
  '0',
  'px',
  '0.5',
  '1',
  '1.5',
  '2',
  '2.5',
  '3',
  '3.5',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '14',
  '16',
  '20',
  '24',
  '28',
  '32',
  '36',
  '40',
  '44',
  '48',
  '52',
  '56',
  '60',
  '64',
  '72',
  '80',
  '96',
]

// Generate shadow values
const shadowValues = [
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  'inner',
  'none',
  'sm-light',
  'md-light',
  'lg-light',
  'xl-light',
  '2xl-light',
]

// Generate border width values
const borderWidthValues = ['0', 'px', '1', '2', '4', '8']

// Generate border radius values
const borderRadiusValues = ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full']

export const spacingClasses: SpacingClassesType = ({
  condition = () => true,
  overrides = {},
} = {}) => {
  const spacingResult: Field = {
    name: 'spacingClasses',
    type: 'group',
    admin: {
      condition,
    },
    fields: [
      {
        type: 'tabs',
        tabs: [
          {
            label: 'Margin',
            fields: [
              ...generateResponsiveOptions('m', spacingValues, 'Margin All'),
              ...generateResponsiveOptions('mx', spacingValues, 'Margin X (Left/Right)'),
              ...generateResponsiveOptions('my', spacingValues, 'Margin Y (Top/Bottom)'),
              ...generateResponsiveOptions('mt', spacingValues, 'Margin Top'),
              ...generateResponsiveOptions('-mt', spacingValues, '-Margin Top'),
              ...generateResponsiveOptions('mr', spacingValues, 'Margin Right'),
              ...generateResponsiveOptions('-mr', spacingValues, '-Margin Right'),
              ...generateResponsiveOptions('mb', spacingValues, 'Margin Bottom'),
              ...generateResponsiveOptions('-mb', spacingValues, '-Margin Bottom'),
              ...generateResponsiveOptions('ml', spacingValues, 'Margin Left'),
            ],
          },
          {
            label: 'Padding',
            fields: [
              ...generateResponsiveOptions('p', spacingValues, 'Padding All'),
              ...generateResponsiveOptions('px', spacingValues, 'Padding X (Left/Right)'),
              ...generateResponsiveOptions('py', spacingValues, 'Padding Y (Top/Bottom)'),
              ...generateResponsiveOptions('pt', spacingValues, 'Padding Top'),
              ...generateResponsiveOptions('pr', spacingValues, 'Padding Right'),
              ...generateResponsiveOptions('pb', spacingValues, 'Padding Bottom'),
              ...generateResponsiveOptions('pl', spacingValues, 'Padding Left'),
            ],
          },
          {
            label: 'Border',
            fields: [
              ...generateResponsiveOptions('border', borderWidthValues, 'Border All'),
              ...generateResponsiveOptions('border-t', borderWidthValues, 'Border Top'),
              ...generateResponsiveOptions('border-r', borderWidthValues, 'Border Right'),
              ...generateResponsiveOptions('border-b', borderWidthValues, 'Border Bottom'),
              ...generateResponsiveOptions('border-l', borderWidthValues, 'Border Left'),
              ...generateResponsiveOptions('rounded', borderRadiusValues, 'Border Radius'),
              ...generateResponsiveOptions('rounded-t', borderRadiusValues, 'Border Radius Top'),
              ...generateResponsiveOptions('rounded-r', borderRadiusValues, 'Border Radius Right'),
              ...generateResponsiveOptions('rounded-b', borderRadiusValues, 'Border Radius Bottom'),
              ...generateResponsiveOptions('rounded-l', borderRadiusValues, 'Border Radius Left'),
            ],
          },
          {
            label: 'Shadow',
            fields: [...generateResponsiveOptions('shadow', shadowValues, 'Shadow')],
          },
          {
            label: 'Background',
            fields: [
              {
                name: 'backgroundType',
                type: 'select',
                label: 'Background Type',
                defaultValue: 'none',
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Color', value: 'color' },
                  { label: 'Gradient', value: 'gradient' },
                ],
              },
              bgColorPickerAll({
                condition: (_, { backgroundType }) => backgroundType === 'color',
              }),
              {
                name: 'gradientSettings',
                type: 'group',
                admin: {
                  condition: (_, { backgroundType }) => backgroundType === 'gradient',
                },
                fields: [
                  {
                    name: 'direction',
                    type: 'select',
                    options: [
                      { label: 'Left to Right', value: 'bg-gradient-to-r' },
                      { label: 'Right to Left', value: 'bg-gradient-to-l' },
                      { label: 'Top to Bottom', value: 'bg-gradient-to-b' },
                      { label: 'Bottom to Top', value: 'bg-gradient-to-t' },
                      { label: 'Top Left to Bottom Right', value: 'bg-gradient-to-br' },
                      { label: 'Top Right to Bottom Left', value: 'bg-gradient-to-bl' },
                      { label: 'Bottom Right to Top Left', value: 'bg-gradient-to-tl' },
                      { label: 'Bottom Left to Top Right', value: 'bg-gradient-to-tr' },
                    ],
                  },
                  gradientColorPicker({
                    prefix: 'from',
                  }),
                  gradientColorPicker({
                    prefix: 'via',
                  }),
                  gradientColorPicker({
                    prefix: 'to',
                  }),
                ],
              },
              ...generateResponsiveOptions('opacity', opacityValues, 'Opacity'),
            ],
          },
        ],
      },
    ],
  }

  return deepMerge(spacingResult, overrides)
}

// Helper function to extract all classes from spacingClasses data
export const extractSpacingClasses = (data: Record<string, any> | undefined | null): string => {
  if (!data) return ''

  const classes: string[] = []

  // Process data recursively to handle any structure
  const processObject = (obj: Record<string, any>) => {
    // Handle background type specifically
    if (obj.backgroundType && obj.backgroundType !== 'none') {
      // Only process background-related classes based on the selected type
      switch (obj.backgroundType) {
        case 'color':
          // For color type, add the bgColor class
          if (obj.bgColor) classes.push(obj.bgColor)
          break
        case 'gradient':
          // For gradient type, add gradient-related classes
          if (obj.gradientSettings) {
            const { direction, fromColor, viaColor, toColor } = obj.gradientSettings
            if (direction) classes.push(direction)
            if (fromColor) classes.push(fromColor)
            if (viaColor) classes.push(viaColor)
            if (toColor) classes.push(toColor)
          }
          break
        // For 'none', don't add any background classes
      }

      Object.entries(obj).forEach(([key, value]) => {
        if (key.startsWith('opacity') && value && typeof value === 'string') {
          classes.push(value)
        }
      })

      // Process all non-background related properties
      Object.entries(obj).forEach(([key, value]) => {
        if (!['backgroundType', 'bgColor', 'gradientSettings'].includes(key)) {
          if (value && typeof value === 'string' && !key.startsWith('opacity')) {
            classes.push(value)
          } else if (value && typeof value === 'object' && key !== 'gradientSettings') {
            processObject(value)
          }
        }
      })
    } else {
      // Standard processing for objects without backgroundType
      Object.entries(obj).forEach(([value]) => {
        if (value && typeof value === 'string') {
          // Only add if it's a non-empty string (a CSS class)
          classes.push(value)
        } else if (value && typeof value === 'object') {
          // Recursively process nested objects
          processObject(value)
        }
      })
    }
  }

  if (typeof data === 'object' && data !== null) {
    processObject(data)
  }

  return classes.filter(Boolean).join(' ')
}
