import { useCallback, useState } from 'react';

export type PrevSelectedIndex = null | number;

/**
 * @title multipleSelect hooks
 * @description multipleSelect by hold down shift key
 */
export default function useMultipleSelect() {
  const [prevSelectedIndex, setPrevSelectedIndex] = useState<PrevSelectedIndex>(null);

  const multipleSelect = useCallback(
    <T, K>(currentSelectedIndex: number, data: T[], selectedKeys: Set<K>, key?: (item: T) => K) => {
      const getKey = (item: T): K => {
        if (typeof key === 'function') {
          return key(item);
        }

        return item as unknown as K;
      };

      let configPrevSelectedIndex = prevSelectedIndex;

      // prevSelectedIndex reset case
      if (prevSelectedIndex === null) {
        const selectedIndexArr: number[] = [];
        data.forEach((item, idx) => {
          if (selectedKeys.has(getKey(item))) {
            selectedIndexArr.push(idx);
          }
        });

        // nearest item between currentIndex and selectedIndexArr
        let nearestIndex = selectedIndexArr[0];
        selectedIndexArr.forEach((item) => {
          if (
            Math.abs(item - currentSelectedIndex) < Math.abs(nearestIndex - currentSelectedIndex)
          ) {
            nearestIndex = item;
          }
        });
        configPrevSelectedIndex = nearestIndex ?? currentSelectedIndex;
      }

      // add/delete the selected range
      const startIndex = Math.min(configPrevSelectedIndex || 0, currentSelectedIndex);
      const endIndex = Math.max(configPrevSelectedIndex || 0, currentSelectedIndex);
      const rangeKeys = data.slice(startIndex, endIndex + 1).map((item) => getKey(item));
      const shouldSelected = rangeKeys.some((rangeKey) => !selectedKeys?.has(rangeKey));
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
