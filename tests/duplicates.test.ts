import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { guardDuplicates } from '../src/lib/generateId.ts';

describe('duplicate slug guard', () => {
  it('throws on duplicate ids within a collection', () => {
    const generateId = guardDuplicates('people');
    generateId({ entry: 'alice.md', base: new URL('file:///'), data: {} });
    assert.throws(
      () => generateId({ entry: 'alice.md', base: new URL('file:///'), data: {} }),
      /Duplicate slug "alice" in collection "people"/,
    );
  });

  it('allows unique ids', () => {
    const generateId = guardDuplicates('people');
    assert.doesNotThrow(() =>
      generateId({ entry: 'alice.md', base: new URL('file:///'), data: {} }),
    );
    assert.doesNotThrow(() =>
      generateId({ entry: 'bob.md', base: new URL('file:///'), data: {} }),
    );
  });

  it('uses data.slug when present', () => {
    const generateId = guardDuplicates('posts');
    generateId({ entry: '01-hello.md', base: new URL('file:///'), data: { slug: 'hello' } });
    assert.throws(
      () => generateId({ entry: '02-hello.md', base: new URL('file:///'), data: { slug: 'hello' } }),
      /Duplicate slug "hello" in collection "posts"/,
    );
  });

  it('isolates collections', () => {
    const peopleGen = guardDuplicates('people');
    const teamsGen = guardDuplicates('teams');
    assert.doesNotThrow(() =>
      peopleGen({ entry: 'engineering.md', base: new URL('file:///'), data: {} }),
    );
    assert.doesNotThrow(() =>
      teamsGen({ entry: 'engineering.md', base: new URL('file:///'), data: {} }),
    );
  });
});
