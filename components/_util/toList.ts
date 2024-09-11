export default function toList<T>(candidate: T | T[]): T[] {
  if (candidate === undefined || candidate === null) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}
