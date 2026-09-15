import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';
import { guardDuplicates } from './lib/generateId.ts';
import {
  personSchema,
  postBaseSchema,
  projectBaseSchema,
  teamBaseSchema,
} from './schemas.ts';

const people = defineCollection({
  loader: glob({
    base: './src/content/people',
    pattern: '**/*.md',
    generateId: guardDuplicates('people'),
  }),
  schema: personSchema,
});

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
    generateId: guardDuplicates('posts'),
  }),
  schema: postBaseSchema.extend({
    author: reference('people'),
  }),
});

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.md',
    generateId: guardDuplicates('projects'),
  }),
  schema: projectBaseSchema.extend({
    team: reference('teams'),
    contributors: z.array(reference('people')).default([]),
  }),
});

const teams = defineCollection({
  loader: glob({
    base: './src/content/teams',
    pattern: '**/*.md',
    generateId: guardDuplicates('teams'),
  }),
  schema: teamBaseSchema.extend({
    members: z.array(reference('people')).default([]),
    projects: z.array(reference('projects')).default([]),
  }),
});

export const collections = { people, posts, projects, teams };
