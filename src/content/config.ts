import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    group: z.enum(['Getting Started', 'Node Operators', 'Reference', 'Developers']),
    order: z.number(),
  }),
});

export const collections = { docs };
