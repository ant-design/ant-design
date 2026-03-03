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
