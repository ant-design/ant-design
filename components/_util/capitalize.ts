export default function capitalize<T extends string>(str: T): Capitalize<T> {
  if (typeof str !== 'string') {
    return str;
  }

  const ret = str.charAt(0).toUpperCase() + str.slice(1);
  return ret as Capitalize<T>;
}
