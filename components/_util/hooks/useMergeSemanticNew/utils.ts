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
export const styleFillObjectBySchema = (obj: Record<string, any>, schema: Record<string, any>) => {
  const newObj: Record<string, any> = { ...obj };
  Object.keys(schema).forEach((key) => {
    const thisData = newObj[key];
    if (thisData) {
      const fillKey = schema[key]._default;
      const removeKeys = schema[key]._remove || [];
      if (fillKey && !thisData[fillKey]) {
        const holderData = { ...thisData };
        const fillData = { ...thisData };
        Object.keys(fillData).forEach((k) => {
          if (removeKeys.includes(k)) {
            delete fillData[k];
          } else {
            delete holderData[k];
          }
        });
        newObj[key] = holderData;
        newObj[key][fillKey] = fillData;
      } else {
        newObj[key] = styleFillObjectBySchema(thisData, schema[key]);
      }
    }
  });
  return newObj;
};
