export function flatArray(data = [], childrenName = 'children') {
  const result = [];
  const loop = (array) => {
    array.forEach(item => {
      const newItem = { ...item };
      delete newItem[childrenName];
      result.push(newItem);
      if (item[childrenName] && item[childrenName].length > 0) {
        loop(item[childrenName]);
      }
    });
  };
  loop(data);
  return result;
}
