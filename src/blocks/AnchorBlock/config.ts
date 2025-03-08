import type { Block } from 'payload'

export const AnchorBlock: Block = {
  slug: 'anchorBlock',
  interfaceName: 'AnchorBlock',
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      label: 'Anchor ID',
      admin: {
        description: 'This ID will be used in the URL with the # symbol (e.g., #contact)',
      },
    },
    {
      name: 'label',
      type: 'text',
      label: 'Label (optional)',
      admin: {
        description: 'Optional label for admin reference only',
      },
    },
  ],
  labels: {
    singular: 'Anchor',
    plural: 'Anchors',
  },
}
