import {CaseIcon} from '@sanity/icons'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: CaseIcon,
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: 'title',
      client: 'client',
    },
    prepare(selection: any) {
      const {title, client} = selection
      return {
        title: `${client} / ${title}`,
      }
    },
  },
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    orderRankField({type: 'project'}),
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        maxLength: 200,
        source: 'title',
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Client',
      name: 'client',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Services',
      name: 'services',
      type: 'array',
      of: [{type: 'string'}],
      description: "e.g. use 'P' for Product and 'AD' for Art Direction",
    },
    {
      title: 'Year',
      name: 'year',
      type: 'string',
    },
    {
      title: 'Media',
      name: 'media',
      type: 'mux.video',
    },
    {
      title: 'Credits',
      name: 'credits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              title: 'Title',
              name: 'title',
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
            {title: 'Type', name: 'type', type: 'string'},
          ],
        },
      ],
    },
  ],
}
