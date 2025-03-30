export default function toList<T>(candidate: T | T[], skipEmpty = false): T[] {
  if (skipEmpty && (candidate === undefined || candidate === null)) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}
