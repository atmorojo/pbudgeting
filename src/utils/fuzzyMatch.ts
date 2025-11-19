/*
 * TODO:
 * * Use a sophisticated library for fuzzy matching
 * */
export function fuzzyMatch<T>(
  query: string,
  items: T[],
  getValue: (item: T) => string,
) {
  const q = query.toLowerCase();

  return items
    .filter((name) => getValue(name).toLowerCase().includes(q))
    .slice(0, 10);
}
