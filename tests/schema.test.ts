import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  personSchema,
  postSchema,
  projectSchema,
  teamSchema,
} from '../src/schemas.ts';

describe('person schema', () => {
  it('parses valid person frontmatter', () => {
    const data = {
      name: 'Alice',
      role: 'Engineer',
      bio: 'Builds things.',
    };
    assert.doesNotThrow(() => personSchema.parse(data));
  });

  it('requires name', () => {
    const data = { role: 'Engineer' };
    assert.throws(() => personSchema.parse(data));
  });
});

describe('post schema', () => {
  it('parses valid post frontmatter', () => {
    const data = {
      title: 'Hello World',
      date: new Date('2024-01-01'),
      author: 'alice',
    };
    assert.doesNotThrow(() => postSchema.parse(data));
  });

  it('parses ISO date string', () => {
    const data = {
      title: 'Hello World',
      date: '2024-01-01',
      author: 'alice',
    };
    assert.doesNotThrow(() => postSchema.parse(data));
  });

  it('requires title, date, author', () => {
    assert.throws(() => postSchema.parse({ title: 'Hello' }));
    assert.throws(() => postSchema.parse({ date: new Date(), author: 'alice' }));
    assert.throws(() => postSchema.parse({ title: 'Hello', date: new Date() }));
  });
});

describe('project schema', () => {
  it('parses valid project frontmatter', () => {
    const data = {
      title: 'Orbit',
      team: 'engineering',
      contributors: ['alice', 'bob'],
    };
    assert.doesNotThrow(() => projectSchema.parse(data));
  });

  it('allows empty contributors', () => {
    const data = {
      title: 'Orbit',
      team: 'engineering',
      contributors: [],
    };
    assert.doesNotThrow(() => projectSchema.parse(data));
  });

  it('requires title and team', () => {
    assert.throws(() => projectSchema.parse({ title: 'Orbit' }));
    assert.throws(() => projectSchema.parse({ team: 'engineering' }));
  });
});

describe('team schema', () => {
  it('parses valid team frontmatter', () => {
    const data = {
      name: 'Engineering',
      members: ['alice', 'bob'],
      projects: ['orbit'],
    };
    assert.doesNotThrow(() => teamSchema.parse(data));
  });

  it('allows empty arrays', () => {
    const data = {
      name: 'Engineering',
      members: [],
      projects: [],
    };
    assert.doesNotThrow(() => teamSchema.parse(data));
  });

  it('requires name', () => {
    assert.throws(() => teamSchema.parse({ members: [], projects: [] }));
  });
});
