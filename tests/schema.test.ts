import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  personSchema,
  postBaseSchema,
  projectBaseSchema,
  teamBaseSchema,
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

describe('post base schema', () => {
  it('parses valid post frontmatter', () => {
    const data = {
      title: 'Hello World',
      date: new Date('2024-01-01'),
      author: 'alice',
    };
    assert.doesNotThrow(() => postBaseSchema.parse(data));
  });

  it('parses ISO date string', () => {
    const data = {
      title: 'Hello World',
      date: '2024-01-01',
      author: 'alice',
    };
    assert.doesNotThrow(() => postBaseSchema.parse(data));
  });

  it('requires title, date, author', () => {
    assert.throws(() => postBaseSchema.parse({ title: 'Hello' }));
    assert.throws(() => postBaseSchema.parse({ date: new Date(), author: 'alice' }));
    assert.throws(() => postBaseSchema.parse({ title: 'Hello', date: new Date() }));
  });
});

describe('project base schema', () => {
  it('parses valid project frontmatter', () => {
    const data = {
      title: 'Orbit',
      team: 'engineering',
      contributors: ['alice', 'bob'],
    };
    assert.doesNotThrow(() => projectBaseSchema.parse(data));
  });

  it('allows empty contributors', () => {
    const data = {
      title: 'Orbit',
      team: 'engineering',
      contributors: [],
    };
    assert.doesNotThrow(() => projectBaseSchema.parse(data));
  });

  it('requires title and team', () => {
    assert.throws(() => projectBaseSchema.parse({ title: 'Orbit' }));
    assert.throws(() => projectBaseSchema.parse({ team: 'engineering' }));
  });
});

describe('team base schema', () => {
  it('parses valid team frontmatter', () => {
    const data = {
      name: 'Engineering',
      members: ['alice', 'bob'],
      projects: ['orbit'],
    };
    assert.doesNotThrow(() => teamBaseSchema.parse(data));
  });

  it('allows empty arrays', () => {
    const data = {
      name: 'Engineering',
      members: [],
      projects: [],
    };
    assert.doesNotThrow(() => teamBaseSchema.parse(data));
  });

  it('requires name', () => {
    assert.throws(() => teamBaseSchema.parse({ members: [], projects: [] }));
  });
});
