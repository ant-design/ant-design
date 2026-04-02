import isNonNullable from './isNonNullable';

interface Config {
  skipEmpty?: boolean;
}

const toList = <T>(val: T | T[], config: Config = {}): T[] => {
  if (!isNonNullable(val) && config?.skipEmpty) {
    return [];
  }
  return Array.isArray(val) ? val : [val];
};

export default toList;
