import toArray from 'rc-util/lib/Children/toArray';
import type React from 'react';
import { useMemo } from 'react';
import type { DescriptionsItemType } from '..';
import warning from '../../_util/warning';

function getFilledItem(
  rowItem: DescriptionsItemType,
  rowRestCol: number,
  span?: number,
): DescriptionsItemType {
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

// Convert children into items
function transChildren2Items(items?: DescriptionsItemType[], childNodes?: React.ReactNode) {
  if (Array.isArray(items)) {
    return items;
  }

  return toArray(childNodes).map((node) => node?.props);
}

// Calculate the sum of span in a row
function getCalcRows(rowItems: DescriptionsItemType[], mergedColumn: number) {
  const rows: DescriptionsItemType[][] = [];
  let tmpRow: DescriptionsItemType[] = [];
  let rowRestCol = mergedColumn;

  rowItems.forEach((rowItem, index) => {
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

const useRow = (
  mergedColumn: number,
  items?: DescriptionsItemType[],
  children?: React.ReactNode,
) => {
  const rows = useMemo(() => {
    const rowItems = transChildren2Items(items, children)?.filter(
      (n) => n,
    ) as DescriptionsItemType[];
    return getCalcRows(rowItems, mergedColumn);
  }, [items, children, mergedColumn]);

  return [rows];
};

export default useRow;
