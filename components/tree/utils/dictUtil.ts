import type { DataNode, Key } from 'rc-tree/lib/interface';
import { fillFieldNames } from 'rc-tree/lib/utils/treeUtil';

import type { TreeProps } from '../Tree';

enum Record {
  None,
  Start,
  End,
}

type FieldNames = TreeProps['fieldNames'];

function traverseNodesKey(
  treeData: DataNode[],
  callback: (key: Key | number | null, node: DataNode) => boolean,
  fieldNames: Required<NonNullable<FieldNames>>,
) {
  const { key: fieldKey, children: fieldChildren } = fieldNames;

  function processNode(dataNode: DataNode & FieldNames[keyof FieldNames]) {
    const key = dataNode[fieldKey];
    const children = dataNode[fieldChildren];
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback, fieldNames);
    }
  }

  treeData.forEach(processNode);
}

/** 计算选中范围，只考虑expanded情况以优化性能 */
export function calcRangeKeys({
  treeData,
  expandedKeys,
  startKey,
  endKey,
  fieldNames,
}: {
  treeData: DataNode[];
  expandedKeys: Key[];
  startKey?: Key;
  endKey?: Key;
  fieldNames?: FieldNames;
}): Key[] {
  const keys: Key[] = [];
  let record: Record = Record.None;

  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }

  function matchKey(key: Key) {
    return key === startKey || key === endKey;
  }

  traverseNodesKey(
    treeData,
    (key: Key) => {
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
      return expandedKeys.includes(key);
    },
    fillFieldNames(fieldNames),
  );

  return keys;
}

export function convertDirectoryKeysToNodes(
  treeData: DataNode[],
  keys: Key[],
  fieldNames?: FieldNames,
) {
  const restKeys: Key[] = [...keys];
  const nodes: DataNode[] = [];
  traverseNodesKey(
    treeData,
    (key: Key, node: DataNode) => {
      const index = restKeys.indexOf(key);
      if (index !== -1) {
        nodes.push(node);
        restKeys.splice(index, 1);
      }

      return !!restKeys.length;
    },
    fillFieldNames(fieldNames),
  );
  return nodes;
}
