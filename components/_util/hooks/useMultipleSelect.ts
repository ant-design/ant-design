import { useCallback, useState } from 'react';

export type PrevSelectedIndex = null | number;

/**
 * @title multipleSelect hooks
 * @description multipleSelect by hold down shift key
 */
export default function useMultipleSelect<T, K>(getKey: (item: T) => K) {
  const [prevSelectedIndex, setPrevSelectedIndex] = useState<PrevSelectedIndex>(null);

  const multipleSelect = useCallback(
    (currentSelectedIndex: number, data: T[], selectedKeys: Set<K>) => {
      const configPrevSelectedIndex = prevSelectedIndex ?? currentSelectedIndex;

      // add/delete the selected range
      const startIndex = Math.min(configPrevSelectedIndex || 0, currentSelectedIndex);
      const endIndex = Math.max(configPrevSelectedIndex || 0, currentSelectedIndex);
      const rangeKeys = data.slice(startIndex, endIndex + 1).map((item) => getKey(item));
      const shouldSelected = rangeKeys.some((rangeKey) => !selectedKeys.has(rangeKey));
      const changedKeys: K[] = [];

      rangeKeys.forEach((item) => {
        if (shouldSelected) {
          if (!selectedKeys.has(item)) {
            changedKeys.push(item);
          }
          selectedKeys.add(item);
        } else {
          selectedKeys.delete(item);
          changedKeys.push(item);
        }
      });

      setPrevSelectedIndex(shouldSelected ? endIndex : null);

      return changedKeys;
    },
    [prevSelectedIndex],
  );

  const updatePrevSelectedIndex = (val: PrevSelectedIndex) => {
    setPrevSelectedIndex(val);
  };

  return [multipleSelect, updatePrevSelectedIndex] as const;
}
