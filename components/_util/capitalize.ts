import { isString } from './is';

const capitalize = <T extends string>(str: T): Capitalize<T> => {
  if (!isString(str)) {
    return str;
  }
  const ret = str.charAt(0).toUpperCase() + str.slice(1);
  return ret as Capitalize<T>;
};

export default capitalize;
