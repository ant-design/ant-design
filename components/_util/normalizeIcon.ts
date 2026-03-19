import fallbackProp from './fallbackProp';

export default function normalizeIcon<K extends string, V extends { [key in K]?: React.ReactNode }>(
  value: boolean | V | undefined,
  key: K,
  fallback?: React.ReactNode,
) {
  if (value === false) return null;
  if (value === true) return fallback;

  return fallbackProp<React.ReactNode>(value?.[key], fallback);
}
