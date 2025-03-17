import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
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
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: false,
    },
    {
      name: 'issue',
      type: 'relationship',
      relationTo: 'issues',
      required: false,
    },
    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, originalDoc }) => {
            if (data?.title && (!originalDoc || data.title !== originalDoc?.title)) {
              return data.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
            }
            return data?.slug || ''
          },
        ],
      },
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
  ],
}
