import {UserIcon} from '@sanity/icons'

export default {
  title: 'Information Page',
  name: 'informationPage',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'Hero content',
      name: 'heroContent',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            decorators: [],
          },
        },
      ],
    },
    {
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Select Clients',
      name: 'clients',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {title: 'Link', name: 'link', type: 'url'},
            {title: 'Name', name: 'name', type: 'string'},
          ],
        },
      ],
    },
  ],
}
