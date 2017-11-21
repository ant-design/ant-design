import * as React from 'react';

export function flatArray(data: any[] = [], childrenName = 'children') {
  const result: any[] = [];
  const loop = (array: any[]) => {
    array.forEach(item => {
      if (item[childrenName]) {
        const newItem = { ...item };
        delete newItem[childrenName];
        result.push(newItem);
        if (item[childrenName].length > 0) {
          loop(item[childrenName]);
        }
      } else {
        result.push(item);
      }
    });
  };
  loop(data);
  return result;
}

export function treeMap<Node>(tree: Node[], mapper: (node: Node, index: number) => any, childrenName = 'children') {
  return tree.map((node: any, index) => {
    const extra: any = {};
    if (node[childrenName]) {
      extra[childrenName] = treeMap(node[childrenName], mapper, childrenName);
    }
    return {
      ...mapper(node as Node, index),
      ...extra,
    };
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

export function normalizeColumns(elements: React.ReactChildren) {
  const columns: any[] = [];
  React.Children.forEach(elements, (element) => {
    if (!React.isValidElement(element)) {
      return;
    }
    const column: any = {
      ...element.props,
    };
    if (element.key) {
      column.key = element.key;
    }
    if (element.type && (element.type as any).__ANT_TABLE_COLUMN_GROUP) {
      column.children = normalizeColumns(column.children);
    }
    columns.push(column);
  });
  return columns;
}
