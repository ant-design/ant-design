export const isNonNullable = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};
