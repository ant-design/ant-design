import * as React from 'react';
import { useEvent, useMergedState } from 'rc-util';

import type { TransferKey } from '../interface';

const EMPTY_KEYS: TransferKey[] = [];

function filterKeys(keys: TransferKey[], dataKeys: Set<TransferKey>) {
  const filteredKeys = keys.filter((key) => dataKeys.has(key));
  return keys.length === filteredKeys.length ? keys : filteredKeys;
}

function flattenKeys(keys: Set<TransferKey>) {
  return Array.from(keys).join(';');
}

function useSelection<T extends { key: TransferKey }>(
  leftDataSource: T[],
  rightDataSource: T[],
  selectedKeys?: TransferKey[],
): [
  sourceSelectedKeys: TransferKey[],
  targetSelectedKeys: TransferKey[],
  setSourceSelectedKeys: (srcKeys: TransferKey[]) => void,
  setTargetSelectedKeys: (srcKeys: TransferKey[]) => void,
] {
  // Prepare `dataSource` keys
  const [leftKeys, rightKeys] = React.useMemo(
    () => [
      new Set(leftDataSource.map<React.Key>((src) => src?.key)),
      new Set(rightDataSource.map<React.Key>((src) => src?.key)),
    ],
    [leftDataSource, rightDataSource],
  );

  // Selected Keys
  const [mergedSelectedKeys, setMergedSelectedKeys] = useMergedState<React.Key[]>(EMPTY_KEYS, {
    value: selectedKeys,
  });

  const sourceSelectedKeys = React.useMemo(
    () => filterKeys(mergedSelectedKeys, leftKeys),
    [mergedSelectedKeys, leftKeys],
  );
  const targetSelectedKeys = React.useMemo(
    () => filterKeys(mergedSelectedKeys, rightKeys),
    [mergedSelectedKeys, rightKeys],
  );

  // // Reset when data changed
  React.useEffect(() => {
    setMergedSelectedKeys([
      ...filterKeys(mergedSelectedKeys, leftKeys),
      ...filterKeys(mergedSelectedKeys, rightKeys),
    ]);
  }, [flattenKeys(leftKeys), flattenKeys(rightKeys)]);

  // Update keys
  const setSourceSelectedKeys = useEvent((nextSrcKeys: TransferKey[]) => {
    setMergedSelectedKeys([...nextSrcKeys, ...targetSelectedKeys]);
  });
  const setTargetSelectedKeys = useEvent((nextTargetKeys: TransferKey[]) => {
    setMergedSelectedKeys([...sourceSelectedKeys, ...nextTargetKeys]);
  });

  return [
    // Keys
    sourceSelectedKeys,
    targetSelectedKeys,
    // Updater
    setSourceSelectedKeys,
    setTargetSelectedKeys,
  ];
}

export default useSelection;
