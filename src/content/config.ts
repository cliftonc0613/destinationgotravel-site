import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    category: z.enum(['Europe', 'All-Inclusive', 'Cruises', 'General']),
    tags: z.array(z.string()).default([]),
    author: z.string().default('Dawn Owens'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
