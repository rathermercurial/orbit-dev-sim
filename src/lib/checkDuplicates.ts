import fs from 'node:fs';
import path from 'node:path';

export interface SlugInfo {
  slug: string;
  file: string;
}

export function getSlugs(contentDir: string, collection: string): SlugInfo[] {
  const entries: SlugInfo[] = [];
  const dirPath = path.join(contentDir, collection);
  if (!fs.existsSync(dirPath)) return entries;

  function walk(currentPath: string, relativePath: string) {
    for (const entry of fs.readdirSync(currentPath)) {
      const fullPath = path.join(currentPath, entry);
      const relPath = relativePath ? path.join(relativePath, entry) : entry;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, relPath);
      } else if (entry.endsWith('.md')) {
        const slug = relPath.replace(/\.md$/, '');
        entries.push({ slug, file: relPath });
      }
    }
  }

  walk(dirPath, '');
  return entries;
}

export function findDuplicates(slugs: SlugInfo[]): Map<string, string[]> {
  const seen = new Map<string, string>();
  const duplicates = new Map<string, string[]>();

  for (const { slug, file } of slugs) {
    const lower = slug.toLowerCase();
    if (seen.has(lower)) {
      if (!duplicates.has(lower)) {
        duplicates.set(lower, [seen.get(lower)!]);
      }
      duplicates.get(lower)!.push(file);
    } else {
      seen.set(lower, file);
    }
  }

  return duplicates;
}

export function checkDuplicateSlugs(contentDir: string): void {
  const collections = fs.readdirSync(contentDir).filter((entry) => {
    const stat = fs.statSync(path.join(contentDir, entry));
    return stat.isDirectory();
  });

  for (const collection of collections) {
    const slugs = getSlugs(contentDir, collection);
    const dups = findDuplicates(slugs);
    if (dups.size > 0) {
      const messages: string[] = [];
      for (const [slug, files] of dups) {
        messages.push(`  slug "${slug}" in files: ${files.join(', ')}`);
      }
      throw new Error(
        `Collection "${collection}" has duplicate slugs:\n${messages.join('\n')}`,
      );
    }
  }
}
