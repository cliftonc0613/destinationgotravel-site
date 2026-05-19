import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    category: z.enum(['Europe', 'All-Inclusive', 'Cruises', 'General']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    author: z.string().default('Dawn Owens'),
    draft: z.boolean().default(false),
  }),
});

const destinations = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/destinations' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    heroImageAlt: z.string(),
    specialty: z.enum(['europe', 'all-inclusive', 'cruises']),
    order: z.number(),
  }),
});

export const collections = { blog, destinations };
