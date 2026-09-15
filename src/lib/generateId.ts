interface GenerateIdOptions {
  /** The path to the entry file, relative to the base directory. */
  entry: string;
  /** The base directory URL. */
  base: URL;
  /** The parsed, unvalidated data of the entry. */
  data: Record<string, unknown>;
}

export function guardDuplicates(
  collection: string,
  generateId?: (options: GenerateIdOptions) => string,
): (options: GenerateIdOptions) => string {
  const seen = new Set<string>();
  const inner = generateId ?? defaultGenerateId;
  return (options) => {
    const id = inner(options);
    const lowerId = id.toLowerCase();
    if (seen.has(lowerId)) {
      throw new Error(
        `Duplicate slug "${id}" in collection "${collection}"`,
      );
    }
    seen.add(lowerId);
    return id;
  };
}

function defaultGenerateId({ entry, data }: GenerateIdOptions): string {
  if (data.slug) {
    return String(data.slug);
  }
  return entry.replace(/\.md$/, '').replace(/\/index\.md$/, '');
}
