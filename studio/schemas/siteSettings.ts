export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'SEO title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'SEO description',
      name: 'seoDescription',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
    },
    {
      title: 'Services',
      name: 'secondaryServices',
      type: 'array',
      preview: {
        select: {
          title: 'title',
        },
        prepare(selection: any) {
          const {title} = selection
          return {
            title,
          }
        },
      },
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Superscript',
              name: 'superscript',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      title: 'Showreel video',
      name: 'showreel',
      type: 'mux.video',
    },
  ],
}
