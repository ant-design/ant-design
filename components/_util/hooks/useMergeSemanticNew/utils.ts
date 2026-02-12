/**
 * Fill object structure by schema, initialize empty objects for keys with `_default` property.
 */
export const fillObjectBySchema = (obj: Record<string, any>, schema: Record<string, any>) => {
  const newObj: Record<string, any> = { ...obj };
  Object.keys(schema).forEach((key) => {
    if (schema[key]._default) {
      newObj[key] ||= {};
    } else {
      newObj[key] = fillObjectBySchema(newObj[key], schema[key]);
    }
  });
  return newObj;
};

/**
 * Convert string values to objects according to schema, using `_default` as the key.
 */
export const stringCovertObjectBySchema = (
  obj: Record<string, any>,
  schema: Record<string, any>,
) => {
  const newObj: Record<string, any> = { ...obj };
  Object.keys(schema).forEach((key) => {
    const thisData = newObj[key];
    if (thisData) {
      const thisSchema = schema[key];
      const fillKey = thisSchema._default;
      if (fillKey && typeof thisData === 'string') {
        newObj[key] = {};
        newObj[key][fillKey] = thisData;
      } else {
        newObj[key] = stringCovertObjectBySchema(thisData, thisSchema);
      }
    }
  });
  return newObj;
};
