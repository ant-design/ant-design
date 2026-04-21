// \b([A-Za-z_$][\w$]*)\s*!==\s*(?:undefined\s*&&\s*\1\s*!==\s*null|null\s*&&\s*\1\s*!==\s*undefined)\b
// \b([A-Za-z_$][\w$\.]*)\s*===\s*(?:undefined|null)\s*\|\|\s*\1\s*===\s*(?:undefined|null)\b
export const isNonNullable = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined && val !== null;
};

export const isNumber = (val: any): val is number => {
  return typeof val === 'number' && !Number.isNaN(val);
};

export const isPrimitive = (value: any) => {
  return (typeof value !== 'object' && typeof value !== 'function') || value === null;
};
