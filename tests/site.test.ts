import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const CONTENT_DIR = new URL('../src/content', import.meta.url).pathname;
const LAYOUT_PATH = new URL('../src/layouts/Base.astro', import.meta.url).pathname;

describe('site structure', () => {
  it('has exactly 6 posts', () => {
    const postsDir = path.join(CONTENT_DIR, 'posts');
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
    assert.strictEqual(files.length, 6, `Expected 6 posts, found ${files.length}`);
  });

  it('Base layout nav wires all four collections', () => {
    const layout = fs.readFileSync(LAYOUT_PATH, 'utf8');
    const requiredPaths = ['/posts', '/people', '/projects', '/teams'];
    for (const p of requiredPaths) {
      assert.ok(
        layout.includes(`href="${p}"`),
        `Base layout nav missing link to ${p}`,
      );
    }
  });
});
