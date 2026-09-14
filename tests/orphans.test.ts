import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const CONTENT_DIR = new URL('../src/content', import.meta.url).pathname;

function readFrontmatter(dir: string, slug: string): Record<string, unknown> {
  const filePath = path.join(CONTENT_DIR, dir, `${slug}.md`);
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`No frontmatter in ${filePath}`);
  return yaml.load(match[1]) as Record<string, unknown>;
}

function getSlugs(dir: string): string[] {
  const dirPath = path.join(CONTENT_DIR, dir);
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

describe('orphan reference validation', () => {
  const peopleSlugs = new Set(getSlugs('people'));
  const teamSlugs = new Set(getSlugs('teams'));
  const projectSlugs = new Set(getSlugs('projects'));

  it('every post author references an existing person', () => {
    for (const slug of getSlugs('posts')) {
      const fm = readFrontmatter('posts', slug);
      const author = fm.author as string;
      assert.ok(
        peopleSlugs.has(author),
        `Post "${slug}" author "${author}" not found in people`,
      );
    }
  });

  it('every project team references an existing team', () => {
    for (const slug of getSlugs('projects')) {
      const fm = readFrontmatter('projects', slug);
      const team = fm.team as string;
      assert.ok(
        teamSlugs.has(team),
        `Project "${slug}" team "${team}" not found in teams`,
      );
    }
  });

  it('every project contributor references an existing person', () => {
    for (const slug of getSlugs('projects')) {
      const fm = readFrontmatter('projects', slug);
      const contributors = (fm.contributors as string[]) ?? [];
      for (const c of contributors) {
        assert.ok(
          peopleSlugs.has(c),
          `Project "${slug}" contributor "${c}" not found in people`,
        );
      }
    }
  });

  it('every team member references an existing person', () => {
    for (const slug of getSlugs('teams')) {
      const fm = readFrontmatter('teams', slug);
      const members = (fm.members as string[]) ?? [];
      for (const m of members) {
        assert.ok(
          peopleSlugs.has(m),
          `Team "${slug}" member "${m}" not found in people`,
        );
      }
    }
  });

  it('every team project references an existing project', () => {
    for (const slug of getSlugs('teams')) {
      const fm = readFrontmatter('teams', slug);
      const projects = (fm.projects as string[]) ?? [];
      for (const p of projects) {
        assert.ok(
          projectSlugs.has(p),
          `Team "${slug}" project "${p}" not found in projects`,
        );
      }
    }
  });
});
