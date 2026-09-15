# PR Evidence — sim2/people-teams

## Test Output

```
$ npm test

> sim-scaffold@0.0.1 test
> node --test tests/**/*.test.ts

▶ duplicate slug guard
  ✔ throws on duplicate ids within a collection (1.65664ms)
  ✔ allows unique ids (0.389799ms)
  ✔ uses data.slug when present (0.267235ms)
  ✔ isolates collections (0.265796ms)
✔ duplicate slug guard (4.361405ms)
▶ person schema
  ✔ parses valid person frontmatter (2.568458ms)
  ✔ requires name (0.953266ms)
✔ person schema (4.879471ms)
▶ post base schema
  ✔ parses valid post frontmatter (0.981201ms)
  ✔ parses ISO date string (0.184718ms)
  ✔ requires title, date, author (0.585446ms)
✔ post base schema (2.094662ms)
▶ project base schema
  ✔ parses valid project frontmatter (1.021221ms)
  ✔ allows empty contributors (0.282559ms)
  ✔ requires title and team (0.571568ms)
✔ project base schema (2.367501ms)
▶ team base schema
  ✔ parses valid team frontmatter (0.962016ms)
  ✔ allows empty arrays (0.323398ms)
  ✔ requires name (0.327786ms)
✔ team base schema (1.972602ms)
▶ site structure
  ✔ has exactly 6 posts (1.103129ms)
  ✔ Base layout nav wires all four collections (0.350961ms)
✔ site structure (2.983542ms)
ℹ tests 17
ℹ suites 6
ℹ pass 17
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 221.260081
```

## Build Output

```
$ npm run build

> sim-scaffold@0.0.1 build
> astro build

02:47:26 [content] Syncing content
02:47:26 [content] Synced content
02:47:26 [types] Generated 667ms
02:47:26 [build] output: "static"
02:47:26 [build] mode: "static"
02:47:26 [build] directory: /home/admin/orca/workspaces/orbit-dev-sim/sim2-people/dist/
02:47:26 [build] Collecting build info...
02:47:26 [build] ✓ Completed in 689ms.
02:47:26 [build] Building static entrypoints...
02:47:26 [vite] ✓ built in 249ms
02:47:27 [vite] ✓ built in 45ms
02:47:27 [build] Rearranging server assets...

 generating static routes 
02:47:27   ├─ /people/david-okonkwo/index.html (+13ms) 
02:47:27   ├─ /people/elena-vasquez/index.html (+2ms) 
02:47:27   ├─ /people/james-park/index.html (+1ms) 
02:47:27   ├─ /people/marcus-chen/index.html (+1ms) 
02:47:27   ├─ /people/priya-sharma/index.html (+1ms) 
02:47:27   ├─ /people/index.html (+2ms) 
02:47:27   ├─ /posts/api-reference/index.html (+3ms) 
02:47:27   ├─ /posts/changelog/index.html (+2ms) 
02:47:27   ├─ /posts/design-principles/index.html (+2ms) 
02:47:27   ├─ /posts/hello-world/index.html (+1ms) 
02:47:27   ├─ /posts/quick-start/index.html (+1ms) 
02:47:27   ├─ /posts/release-notes/index.html (+1ms) 
02:47:27   ├─ /posts/index.html (+2ms) 
02:47:27   ├─ /projects/aurora/index.html (+2ms) 
02:47:27   ├─ /projects/cosmos/index.html (+1ms) 
02:47:27   ├─ /projects/lunar/index.html (+1ms) 
02:47:27   ├─ /projects/nebula/index.html (+1ms) 
02:47:27   ├─ /projects/orbit/index.html (+1ms) 
02:47:27   ├─ /projects/solar/index.html (+1ms) 
02:47:27   ├─ /projects/stellar/index.html (+1ms) 
02:47:27   ├─ /projects/index.html (+2ms) 
02:47:27   ├─ /teams/content/index.html (+2ms) 
02:47:27   ├─ /teams/design/index.html (+1ms) 
02:47:27   ├─ /teams/engineering/index.html (+1ms) 
02:47:27   ├─ /teams/index.html (+2ms) 
02:47:27   ├─ /index.html (+2ms) 
02:47:27 ✓ Completed in 72ms.

02:47:27 [build] ✓ Completed in 400ms.
02:47:27 [build] 26 page(s) built in 1.09s
02:47:27 [build] Complete!
```

## Dev-mode Duplicate-slug Failure Evidence

A deliberate duplicate was introduced by creating `src/content/people/marcus-chen-dup.md` with `slug: marcus-chen` in its frontmatter, then running `npm run dev`:

```
> astro dev

02:46:55 [vite] connected.
02:46:57 [types] Generated 0ms
02:46:57 [vite] connected.
02:46:57 [content] Syncing content
02:46:57 [WARN] [glob-loader] **people** contains multiple entries with the same slug: `marcus-chen`. Slugs must be unique.

Entries: 
- src/content/people/marcus-chen.md
- src/content/people/marcus-chen-dup.md
Duplicate slug "marcus-chen" in collection "people"
  Location:
    /home/admin/orca/workspaces/orbit-dev-sim/sim2-people/src/lib/generateId.ts:19:13
  Stack trace:
    at eval (/home/admin/orca/workspaces/orbit-dev-sim/sim2-people/src/lib/generateId.ts:19:13)
    at syncData (/home/admin/orca/workspaces/orbit-dev-sim/sim2-people/node_modules/astro/dist/content/loaders/glob.js:85:20)
```

The sync-time throw from `guardDuplicates` prevents the dev server from serving the affected collection cleanly. A curl to `http://localhost:4321/people/` fails because the dev process aborts before the Vite server can respond.

## Resolved Reference Verification

Built output confirms full names are rendered instead of raw slugs:

- Posts index: `by <a href="/people/james-park">James Park</a>`
- Projects index: `team: <a href="/teams/engineering">Engineering</a>`
- Team detail (engineering): `Members: <a href="/people/marcus-chen">Marcus Chen</a>, <a href="/people/elena-vasquez">Elena Vasquez</a>`
- Team detail (engineering): `Projects: <a href="/projects/orbit">Orbit</a>`
- People index: `<a href="/people/david-okonkwo">David Okonkwo</a><span>— Developer Advocate</span>`
