export const fillObjectBySchema = (obj: Record<string, any>, schema: Record<string, any>) => {
  const newObj: Record<string, any> = { ...obj };
  Object.keys(schema).forEach((key) => {
    const thisSchema = schema[key];
    const thisData = obj[key] || {};
    if (thisSchema._default) {
      newObj[key] = thisData;
    } else {
      newObj[key] = fillObjectBySchema(thisData, thisSchema);
    }
  });
  return newObj;
};

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
