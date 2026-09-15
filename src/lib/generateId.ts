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
    if (seen.has(id)) {
      throw new Error(
        `Duplicate slug "${id}" in collection "${collection}"`,
      );
    }
    seen.add(id);
    return id;
  };
}

function defaultGenerateId({ entry, data }: GenerateIdOptions): string {
  if (data.slug) {
    return String(data.slug);
  }
  return entry.replace(/\.md$/, '').replace(/\/index\.md$/, '');
}
