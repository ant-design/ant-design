import * as React from 'react';
import { traverseTreeNodes } from 'rc-tree/lib/util';

export interface TraverseData {
  key: string,
}

enum Record {
  None,
  Start,
  End,
}

/** 计算选中范围，只考虑expanded情况以优化性能 */
export function calcRangeKeys(nodeList: React.ReactNode | React.ReactNode[], expandedKeys: string[], startKey?: string, endKey?: string): string[] {
  const keys: string[] = [];
  let record: Record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key: string) {
    return key === startKey || key === endKey;
  }

  traverseTreeNodes(nodeList, ({ key }: TraverseData) => {
    if (record === Record.End) {
      return false;
    }

    if (matchKey(key)) {
      // Match test
      keys.push(key);

      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      // Append selection
      keys.push(key);
    }

    if (expandedKeys.indexOf(key) === -1) {
      return false;
    }
  });

  return keys;
}
