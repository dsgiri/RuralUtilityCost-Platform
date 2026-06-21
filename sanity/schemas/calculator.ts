export const calculator = {
  name: 'calculator',
  title: 'Calculator',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'uniqueCode',
      title: 'Unique Tracking Code',
      type: 'string',
      validation: (Rule: any) => Rule.required().uppercase(),
      description: 'E.g., CALC-FRM-001. Must match the code in the public registry.',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subCategory',
      title: 'Sub-Category',
      type: 'reference',
      to: [{ type: 'subCategory' }],
      options: {
        filter: ({ document }: any) => {
          if (!document.category) {
            return {
              filter: 'false', // Prevent selection until a category is chosen
            }
          }
          return {
            filter: 'parentCategory._ref == $categoryId',
            params: { categoryId: document.category._ref },
          }
        },
      },
    },
    {
      name: 'howThisWorks',
      title: 'How This Works',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Explanation of the logic behind the calculator.',
    },
    {
      name: 'assumptions',
      title: 'Assumptions',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Key assumptions made in the calculation.',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
        ],
        layout: 'radio',
      },
      initialValue: 'draft',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'uniqueCode',
    },
  },
};
