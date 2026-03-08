import isNonNullable from './isNonNullable';

interface Config {
  skipEmpty?: boolean;
  preserveFalse?: boolean;
}

const toList = <T>(candidate: T | T[], config: Config = {}): T[] => {
  const { skipEmpty, preserveFalse } = config;
  if (skipEmpty && !isNonNullable(candidate)) {
    return [];
  }
  if (preserveFalse && candidate === false) {
    return [false, false] as [T, T];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
};

export default toList;
