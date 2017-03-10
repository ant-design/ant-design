import React from 'react';
import assign from 'object-assign';
import ColumnGroup from './ColumnGroup';

export function flatArray(data: Object[] = [], childrenName = 'children') {
  const result: Object[] = [];
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

export function flatFilter(tree: any[], callback: Function) {
  return tree.reduce((acc, node) => {
    if (callback(node)) {
      acc.push(node);
    }
    if (node.children) {
      const children = flatFilter(node.children, callback);
      acc.push(...children);
    }
    return acc;
  }, []);
}

export function normalizeColumns(elements) {
  const columns: any[] = [];
  React.Children.forEach(elements, (element: React.ReactElement<any>) => {
    if (!React.isValidElement(element)) {
      return;
    }
    const column = assign({}, element.props);
    if (element.key) {
      column.key = element.key;
    }
    if (element.type as any === ColumnGroup) {
      column.children = normalizeColumns(column.children);
    }
    columns.push(column);
  });
  return columns;
}
