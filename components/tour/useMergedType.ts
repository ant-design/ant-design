import { useMemo } from 'react';

interface ItemType {
  type?: string;
}

interface HookProps {
  defaultType?: string;
  itemList?: ItemType[];
  itemIndex?: number;
}

/**
 * Returns the merged type of an item in a list, or the default type.
 *
 * @param defaultType The default type to use if no item type is found.
 * @param itemList The list of items to search for a type.
 * @param itemIndex The index of the item to find a type for.
 * @returns The merged type of the item, or undefined if it doesn't exist.
 */
const useMergedType = ({
  defaultType,
  itemList = [],
  itemIndex,
}: HookProps): string | undefined => {
  const currentMergedType = useMemo(() => {
    if (typeof itemIndex !== 'number') {
      return defaultType;
    }

    const currentItem = itemList[itemIndex];
    if (!currentItem) {
      return defaultType;
    }

    return currentItem.type || defaultType;
  }, [defaultType, itemList, itemIndex]);

  return currentMergedType;
};

export default useMergedType;
