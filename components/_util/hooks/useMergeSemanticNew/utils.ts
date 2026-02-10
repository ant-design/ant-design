export const classNameFillObjectBySchema = (
  obj: Record<string, any>,
  schema: Record<string, any>,
) => {
  const newObj: Record<string, any> = { ...obj };
  Object.keys(schema).forEach((key) => {
    const thisData = newObj[key];
    if (thisData) {
      const fillKey = schema[key]._default;
      if (fillKey && typeof thisData === 'string') {
        newObj[key] = {};
        newObj[key][fillKey] = thisData;
      } else {
        newObj[key] = classNameFillObjectBySchema(thisData, schema[key]);
      }
    }
  });
  return newObj;
};
