import { useMemo } from 'react';

import type { InternalDescriptionsItemType } from '..';
import { devUseWarning } from '../../_util/warning';

const splitArrayByMarker = (
  array: InternalDescriptionsItemType[],
  column: number,
): [InternalDescriptionsItemType[][], boolean] => {
  const result: InternalDescriptionsItemType[][] = [];
  let tempArray: InternalDescriptionsItemType[] = [];
  let count = 0;
  let exceed = false;

  array.forEach((item) => {
    count += item.span || 1;
    if (count >= column || item.fullLine) {
      if (count > column) {
        exceed = true;
      }
      if (item.fullLine) {
        if (tempArray.length > 0) {
          result.push(tempArray);
        }
        result.push([item]);
      } else {
        tempArray.push(item);
        result.push(tempArray);
      }
      // reset
      tempArray = [];
      count = 0;
    } else {
      tempArray.push(item);
    }
  });

  if (tempArray.length > 0) {
    result.push(tempArray);
  }

  const rows = result.map((rows) => {
    const count = rows.reduce((acc, item) => acc + (item.span || 1), 0);
    if (count < column) {
      // If the span of the last element in the current row is less than the column, then add its span to the remaining columns
      const last = rows[rows.length - 1];
      last.span = column - count + 1;
      return rows;
    }
    return rows;
  });
  return [rows, exceed];
};

const useRow = (mergedColumn: number, items: InternalDescriptionsItemType[]) => {
  const [rows, exceed] = useMemo(
    () => splitArrayByMarker(items, mergedColumn),
    [items, mergedColumn],
  );

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Descriptions');

    warning(!exceed, 'usage', 'Sum of column `span` in a line not match `column` of Descriptions.');
  }
  return rows;
};

export default useRow;
