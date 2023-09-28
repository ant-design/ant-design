/**
 * @title multipleSelect hooks
 * @description multipleSelect by hold down shift key
 */
export default function useMultipleSelect() {
  const multipleSelect = <T>(
    prevSelectedIndexRef: React.MutableRefObject<number>,
    currentSelectedIndex: number,
    data: any[],
    selectedKeys: Set<T>,
    updatePrevSelectedIndex = (index: number) => {
      prevSelectedIndexRef.current = index;
    },
  ) => {
    // prevSelectedIndex reset case
    if (prevSelectedIndexRef.current < 0) {
      const selectedIndexArr: number[] = [];
      data.forEach((item, idx) => {
        if (Array.from(selectedKeys).includes(item?.key ?? item)) {
          selectedIndexArr.push(idx);
        }
      });

      // nearest item between currentIndex and selectedIndexArr
      let nearestIndex = selectedIndexArr[0];
      selectedIndexArr.forEach((item) => {
        if (Math.abs(item - currentSelectedIndex) < Math.abs(nearestIndex - currentSelectedIndex)) {
          nearestIndex = item;
        }
      });
      updatePrevSelectedIndex(nearestIndex ?? currentSelectedIndex);
    }

    // add/delete the selected range
    const startIndex = Math.min(prevSelectedIndexRef.current, currentSelectedIndex);
    const endIndex = Math.max(prevSelectedIndexRef.current, currentSelectedIndex);
    const rangeKeys = data.slice(startIndex, endIndex + 1).map((item) => item?.key ?? item);
    const shouldSelected = rangeKeys.some((key) => !selectedKeys?.has(key));
    const changedKeys: T[] = [];

    rangeKeys.forEach((item) => {
      if (shouldSelected) {
        if (!selectedKeys.has(item)) {
          changedKeys.push(item);
        }
        selectedKeys.add(item);
        updatePrevSelectedIndex(endIndex);
      } else {
        selectedKeys.delete(item);
        changedKeys.push(item);
        updatePrevSelectedIndex(-1);
      }
    });

    return changedKeys;
  };

  return [multipleSelect];
}
