import * as React from 'react';
import type { TransferKey } from '../interface';

const EMPTY_KEYS: TransferKey[] = [];

function filterKeys(keys: TransferKey[], dataKeys: Set<TransferKey>) {
  const filteredKeys = keys.filter((key) => dataKeys.has(key));
  return keys.length === filteredKeys.length ? keys : filteredKeys;
}

function flattenKeys(keys: Set<TransferKey>) {
  return Array.from(keys).join(';');
}

export default function useSelection<T extends { key: TransferKey }>(
  leftDataSource: T[],
  rightDataSource: T[],
  selectedKeys: TransferKey[] = EMPTY_KEYS,
): [
  sourceSelectedKeys: TransferKey[],
  targetSelectedKeys: TransferKey[],
  setSourceSelectedKeys: React.Dispatch<React.SetStateAction<TransferKey[]>>,
  setTargetSelectedKeys: React.Dispatch<React.SetStateAction<TransferKey[]>>,
] {
  // Prepare `dataSource` keys
  const [leftKeys, rightKeys] = React.useMemo(
    () => [
      new Set(leftDataSource.map((src) => src.key)),
      new Set(rightDataSource.map((src) => src.key)),
    ],
    [leftDataSource, rightDataSource],
  );

  // Selected Keys
  const [sourceSelectedKeys, setSourceSelectedKeys] = React.useState(() =>
    filterKeys(selectedKeys, leftKeys),
  );
  const [targetSelectedKeys, setTargetSelectedKeys] = React.useState(() =>
    filterKeys(selectedKeys, rightKeys),
  );

  // Fill selected keys
  React.useEffect(() => {
    setSourceSelectedKeys(filterKeys(selectedKeys, leftKeys));
    setTargetSelectedKeys(filterKeys(selectedKeys, rightKeys));
  }, [selectedKeys]);

  // Reset when data changed
  React.useEffect(() => {
    setSourceSelectedKeys(filterKeys(sourceSelectedKeys, leftKeys));
    setTargetSelectedKeys(filterKeys(targetSelectedKeys, rightKeys));
  }, [flattenKeys(leftKeys), flattenKeys(rightKeys)]);

  return [
    // Keys
    sourceSelectedKeys,
    targetSelectedKeys,
    // Updater
    setSourceSelectedKeys,
    setTargetSelectedKeys,
  ];
}
