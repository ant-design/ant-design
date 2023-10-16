import { useCallback, useState } from 'react';

export type PrevSelectedIndex = null | number;

/**
 * @title multipleSelect hooks
 * @description multipleSelect by hold down shift key
 */
export default function useMultipleSelect() {
  const [prevSelectedIndex, setPrevSelectedIndex] = useState<PrevSelectedIndex>(null);

  const multipleSelect = useCallback(
    <T>(currentSelectedIndex: number, data: any[], selectedKeys: Set<T>) => {
      let configPrevSelectedIndex = prevSelectedIndex;

      // prevSelectedIndex reset case
      if (prevSelectedIndex === null) {
        const selectedIndexArr: number[] = [];
        data.forEach((item, idx) => {
          if (Array.from(selectedKeys).includes(item?.key ?? item)) {
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
      const rangeKeys = data.slice(startIndex, endIndex + 1).map((item) => item?.key ?? item);
      const shouldSelected = rangeKeys.some((key) => !selectedKeys?.has(key));
      const changedKeys: T[] = [];

      rangeKeys.forEach((item) => {
        if (shouldSelected) {
          if (!selectedKeys.has(item)) {
            changedKeys.push(item);
          }
          selectedKeys.add(item);
          setPrevSelectedIndex(endIndex);
        } else {
          selectedKeys.delete(item);
          changedKeys.push(item);
          setPrevSelectedIndex(null);
        }
      });

      return changedKeys;
    },
    [prevSelectedIndex],
  );

  const updatePrevSelectedIndex = (val: PrevSelectedIndex) => {
    setPrevSelectedIndex(val);
  };

  return [multipleSelect, updatePrevSelectedIndex] as const;
}
