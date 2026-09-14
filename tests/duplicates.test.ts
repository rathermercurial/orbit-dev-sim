import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getSlugs,
  findDuplicates,
  checkDuplicateSlugs,
} from '../src/lib/checkDuplicates.ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');

describe('duplicate slug detection', () => {
  it('detects case-insensitive duplicate slugs', () => {
    const slugs = [
      { slug: 'dave', file: 'dave.md' },
      { slug: 'Dave', file: 'Dave.md' },
    ];
    const dups = findDuplicates(slugs);
    assert.ok(dups.has('dave'), 'Expected duplicate for dave');
    assert.deepStrictEqual(dups.get('dave'), ['dave.md', 'Dave.md']);
  });

  it('allows unique slugs', () => {
    const slugs = [
      { slug: 'alice', file: 'alice.md' },
      { slug: 'bob', file: 'bob.md' },
    ];
    const dups = findDuplicates(slugs);
    assert.strictEqual(dups.size, 0);
  });

  it('no duplicate slugs in any content collection', () => {
    checkDuplicateSlugs(CONTENT_DIR);
  });
});
