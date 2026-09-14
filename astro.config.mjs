// @ts-check
import { defineConfig } from 'astro/config';
import { checkDuplicateSlugs } from './src/lib/checkDuplicates.ts';

function duplicateSlugGuard() {
  return {
    name: 'duplicate-slug-guard',
    hooks: {
      'astro:build:start': async () => {
        checkDuplicateSlugs('./src/content');
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [duplicateSlugGuard()],
});
