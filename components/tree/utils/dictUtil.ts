import type { DataNode, Key } from 'rc-tree/lib/interface';
import { fillFieldNames } from 'rc-tree/lib/utils/treeUtil';

import type { TreeProps } from '../Tree';

const RECORD_NONE = 0;
const RECORD_START = 1;
const RECORD_END = 2;

type Record = typeof RECORD_NONE | typeof RECORD_START | typeof RECORD_END;

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

  treeData.forEach(processNode as any);
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
  let record: Record = RECORD_NONE;

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
    (key) => {
      if (record === RECORD_END) {
        return false;
      }

      if (matchKey(key as any)) {
        // Match test
        keys.push(key as any);

        if (record === RECORD_NONE) {
          record = RECORD_START;
        } else if (record === RECORD_START) {
          record = RECORD_END;
          return false;
        }
      } else if (record === RECORD_START) {
        // Append selection
        keys.push(key as any);
      }
      return expandedKeys.includes(key as any);
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
    (key, node) => {
      const index = restKeys.indexOf(key as any);
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
