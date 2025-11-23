import isNonNullable from './isNonNullable';

const toList = <T>(candidate: T | T[], skipEmpty = false): T[] => {
  if (skipEmpty && !isNonNullable(candidate)) {
    return [];
  }
  return Array.isArray(candidate) ? candidate : [candidate];
};

export default toList;
