import assign from 'object-assign';
export function flatArray(data = [], childrenName = 'children') {
  const result = [];
  const loop = (array) => {
    array.forEach(item => {
      const newItem = assign({}, item);
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

export function treeMap(tree: Object[], mapper: Function, childrenName = 'children') {
  return tree.map((node, index) => {
    const extra = {};
    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }
    return assign({}, mapper(node, index), extra);
  });
}
