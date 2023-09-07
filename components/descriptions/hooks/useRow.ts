import { useMemo } from 'react';

import type { InternalDescriptionsItemType } from '..';
import warning from '../../_util/warning';

function getFilledItem(
  rowItem: InternalDescriptionsItemType,
  rowRestCol: number,
  span?: number,
): InternalDescriptionsItemType {
  let clone = rowItem;

  if (span === undefined || span > rowRestCol) {
    clone = {
      ...rowItem,
      span: rowRestCol,
    };
    warning(
      span === undefined,
      'Descriptions',
      'Sum of column `span` in a line not match `column` of Descriptions.',
    );
  }
  return clone;
}

// Calculate the sum of span in a row
function getCalcRows(rowItems: InternalDescriptionsItemType[], mergedColumn: number) {
  const rows: InternalDescriptionsItemType[][] = [];
  let tmpRow: InternalDescriptionsItemType[] = [];
  let rowRestCol = mergedColumn;

  rowItems
    .filter((n) => n)
    .forEach((rowItem, index) => {
      const span = rowItem?.span;
      const mergedSpan = span || 1;

      // Additional handle last one
      if (index === rowItems.length - 1) {
        tmpRow.push(getFilledItem(rowItem, rowRestCol, span));
        rows.push(tmpRow);
        return;
      }

      if (mergedSpan < rowRestCol) {
        rowRestCol -= mergedSpan;
        tmpRow.push(rowItem);
      } else {
        tmpRow.push(getFilledItem(rowItem, rowRestCol, mergedSpan));
        rows.push(tmpRow);
        rowRestCol = mergedColumn;
        tmpRow = [];
      }
    });

  return rows;
}

const useRow = (mergedColumn: number, items: InternalDescriptionsItemType[]) => {
  const rows = useMemo(() => getCalcRows(items, mergedColumn), [items, mergedColumn]);

  return rows;
};

export default useRow;
