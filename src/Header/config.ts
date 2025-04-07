import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'type',
          type: 'radio',
          required: true,
          defaultValue: 'link',
          options: [
            {
              label: 'Single Link',
              value: 'link',
            },
            {
              label: 'Dropdown',
              value: 'dropdown',
            },
          ],
        },
        {
          name: 'link',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'link',
          },
          fields: [
            link({
              appearances: false,
              overrides: {
                defaultValue: {
                  type: 'custom',
                  url: '#',
                  label: 'Custom Link',
                },
              },
            }),
          ],
        },
        {
          name: 'dropdown',
          type: 'group',
          admin: {
            condition: (data, siblingData) => siblingData?.type === 'dropdown',
          },
          fields: [
            link({
              appearances: false,
              overrides: {
                defaultValue: {
                  type: 'custom',
                  url: '#',
                  label: 'Custom Link',
                },
              },
            }),
            {
              name: 'links',
              type: 'array',
              fields: [
                link({
                  appearances: false,
                  overrides: {
                    defaultValue: {
                      type: 'custom',
                      url: '#',
                      label: 'Custom Link',
                    },
                  },
                }),
              ],
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    link({
      overrides: {
        name: 'headerButtonLink',
        defaultValue: {
          type: 'custom',
          url: '/intake',
          label: 'Book Now',
        },
      },
      appearances: false,
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
