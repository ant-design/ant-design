import * as React from 'react';
import { getNodeChildren, convertTreeToEntities } from 'rc-tree/lib/util';
import { AntTreeNodeProps, AntTreeNode } from './Tree';

enum Record {
  None,
  Start,
  End,
}

// TODO: Move this logic into `rc-tree`
function traverseNodesKey(
  rootChildren: React.ReactNode | React.ReactNode[],
  callback: (key: string | number | null, node: AntTreeNode) => boolean,
) {
  const nodeList: React.ReactNode[] = getNodeChildren(rootChildren) || [];

  function processNode(node: React.ReactElement<AntTreeNodeProps>) {
    const {
      key,
      props: { children },
    } = node;
    if (callback(key, node as any) !== false) {
      traverseNodesKey(children, callback);
    }
  }

  nodeList.forEach(processNode);
}

export function getFullKeyList(children: React.ReactNode | React.ReactNode[]) {
  const { keyEntities } = convertTreeToEntities(children);
  return Object.keys(keyEntities);
}

/** 计算选中范围，只考虑expanded情况以优化性能 */
export function calcRangeKeys(
  rootChildren: React.ReactNode | React.ReactNode[],
  expandedKeys: string[],
  startKey?: string,
  endKey?: string,
): string[] {
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

  traverseNodesKey(rootChildren, (key: string) => {
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

    return true;
  });

  return keys;
}

export function convertDirectoryKeysToNodes(rootChildren: React.ReactNode | React.ReactNode[], keys: string[]) {
  const restKeys: string[] = [...keys];
  const nodes: AntTreeNode[] = [];
  traverseNodesKey(rootChildren, (key: string, node: AntTreeNode) => {
    const index = restKeys.indexOf(key);
    if (index !== -1) {
      nodes.push(node);
      restKeys.splice(index, 1);
    }

    return !!restKeys.length;
  });
  return nodes;
}