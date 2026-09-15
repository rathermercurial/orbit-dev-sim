import { z } from 'zod';

export const personSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
});

export const postBaseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  author: z.string(),
});

export const projectBaseSchema = z.object({
  title: z.string(),
  team: z.string(),
  contributors: z.array(z.string()).default([]),
});

export const teamBaseSchema = z.object({
  name: z.string(),
  members: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([]),
});
