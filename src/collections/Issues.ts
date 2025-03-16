import type { CollectionConfig } from 'payload'

export const Issues: CollectionConfig = {
  slug: 'issues',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'issueNumber',
      type: 'number',
      required: true,
    },
    {
      name: 'publicationDate',
      type: 'date',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'Published',
      defaultValue: false,
    },
  ],
}
