import * as React from 'react';

const EMPTY_KEYS: string[] = [];

function filterKeys(keys: string[], dataKeys: Set<string>) {
  const filteredKeys = keys.filter((key) => dataKeys.has(key));
  return keys.length === filteredKeys.length ? keys : filteredKeys;
}

function flattenKeys(keys: Set<string>) {
  return Array.from(keys).join(';');
}

export default function useSelection<T extends { key: string }>(
  leftDataSource: T[],
  rightDataSource: T[],
  selectedKeys: string[] = EMPTY_KEYS,
): [
  sourceSelectedKeys: string[],
  targetSelectedKeys: string[],
  setSourceSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>,
  setTargetSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>,
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
