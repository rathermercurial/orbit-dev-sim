import { z } from 'zod';

export const personSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
});

export const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string(),
});

export const projectSchema = z.object({
  title: z.string(),
  team: z.string(),
  contributors: z.array(z.string()).default([]),
});

export const teamSchema = z.object({
  name: z.string(),
  members: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
});
