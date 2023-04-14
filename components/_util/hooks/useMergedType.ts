import { useMemo } from 'react';

type WithType = {
  type?: string;
};

type WithList<T extends string> = {
  [key in T]?: WithType[];
};

type BaseProps<T extends string> = WithType & WithList<T>;

/**
 * Returns the merged type of an item in a list, or the default type.
 * @param props The props object containing the type and list.
 * @param listFieldName The name of the list field in the props object.
 * @param index The index of the item in the list.
 * @returns The merged type of the item, or undefined if it doesn't exist.
 */
const useMergedType = <T extends string>(
  props: BaseProps<T>,
  listFieldName: T,
  index?: number,
): string | undefined => {
  const { type, [listFieldName]: list } = props;

  const currentMergedType = useMemo(() => {
    if (index === undefined) return type;
    return list?.[index]?.type || type;
  }, [type, list, index]);

  return currentMergedType || undefined;
};
export default useMergedType;
