import { useMemo } from 'react';

import type { InternalDescriptionsItemType } from '..';
import { devUseWarning } from '../../_util/warning';

function getFilledItem(
  rowItem: InternalDescriptionsItemType,
  rowRestCol: number,
  span?: number,
): [item: InternalDescriptionsItemType, exceed: boolean] {
  let clone = rowItem;
  let exceed = false;

  if (span === undefined || span > rowRestCol) {
    clone = {
      ...rowItem,
      span: rowRestCol,
    };

    exceed = span !== undefined;
  }
  return [clone, exceed];
}

// Calculate the sum of span in a row
function getCalcRows(
  rowItems: InternalDescriptionsItemType[],
  mergedColumn: number,
): [rows: InternalDescriptionsItemType[][], exceed: boolean] {
  const rows: InternalDescriptionsItemType[][] = [];
  let tmpRow: InternalDescriptionsItemType[] = [];
  let rowRestCol = mergedColumn;
  let exceed = false;

  rowItems
    .filter((n) => n)
    .forEach((rowItem, index) => {
      const span = rowItem?.span;
      const mergedSpan = span || 1;

      // Additional handle last one
      if (index === rowItems.length - 1) {
        const [item, itemExceed] = getFilledItem(rowItem, rowRestCol, span);
        exceed = exceed || itemExceed;

        tmpRow.push(item);
        rows.push(tmpRow);
        return;
      }

      if (mergedSpan < rowRestCol) {
        rowRestCol -= mergedSpan;
        tmpRow.push(rowItem);
      } else {
        const [item, itemExceed] = getFilledItem(rowItem, rowRestCol, mergedSpan);
        exceed = exceed || itemExceed;

        tmpRow.push(item);
        rows.push(tmpRow);
        rowRestCol = mergedColumn;
        tmpRow = [];
      }
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
