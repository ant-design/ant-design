import { useMemo } from 'react';

import type { InternalDescriptionsItemType } from '..';
import { devUseWarning } from '../../_util/warning';

// Calculate the sum of span in a row
function getCalcRows(
  rowItems: InternalDescriptionsItemType[],
  mergedColumn: number,
): [rows: InternalDescriptionsItemType[][], exceed: boolean] {
  let rows: InternalDescriptionsItemType[][] = [];
  let tmpRow: InternalDescriptionsItemType[] = [];
  let exceed = false;
  let count = 0;

  rowItems
    .filter((n) => n)
    .forEach((rowItem) => {
      const { filled, ...restItem } = rowItem;

      if (filled) {
        tmpRow.push(restItem);
        rows.push(tmpRow);
        // reset
        tmpRow = [];
        count = 0;
        return;
      }
      const restSpan = mergedColumn - count;
      count += rowItem.span || 1;
      if (count >= mergedColumn) {
        if (count > mergedColumn) {
          exceed = true;
          tmpRow.push({ ...restItem, span: restSpan });
        } else {
          tmpRow.push(restItem);
        }
        rows.push(tmpRow);
        // reset
        tmpRow = [];
        count = 0;
      } else {
        tmpRow.push(restItem);
      }
    });

  if (tmpRow.length > 0) {
    rows.push(tmpRow);
  }

  rows = rows.map((rows) => {
    const count = rows.reduce((acc, item) => acc + (item.span || 1), 0);
    if (count < mergedColumn) {
      // If the span of the last element in the current row is less than the column, then add its span to the remaining columns
      const last = rows[rows.length - 1];
      last.span = mergedColumn - (count - (last.span || 1));
      return rows;
    }
    return rows;
  });
  return [rows, exceed];
}

const useRow = (mergedColumn: number, items: InternalDescriptionsItemType[]) => {
  const [rows, exceed] = useMemo(() => getCalcRows(items, mergedColumn), [items, mergedColumn]);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Descriptions');

    warning(!exceed, 'usage', 'Sum of column `span` in a line not match `column` of Descriptions.');
  }

  return rows;
};

export default useRow;
