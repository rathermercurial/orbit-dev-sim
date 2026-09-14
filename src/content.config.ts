import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  personSchema,
  postSchema,
  projectSchema,
  teamSchema,
} from './schemas.ts';

const people = defineCollection({
  loader: glob({ base: './src/content/people', pattern: '**/*.md' }),
  schema: personSchema,
});

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: postSchema,
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: projectSchema,
});

const teams = defineCollection({
  loader: glob({ base: './src/content/teams', pattern: '**/*.md' }),
  schema: teamSchema,
});

export const collections = { people, posts, projects, teams };
