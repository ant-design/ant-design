import * as React from 'react';
import classNames from 'classnames';
import get from 'lodash/get';
import { CaretDown, CaretUp } from '@ant-design/icons';
import { TransformColumns, ColumnsType, Key, ColumnType, SortOrder, CompareFn } from '../interface';

const JOIN_KEY = String(Math.random());

function toArray<T>(data: T | T[] | undefined | null): T[] {
  if (data === null || data === undefined) {
    return [];
  }
  return Array.isArray(data) ? data : [data];
}

function getColumnKey<RecordType>(column: ColumnType<RecordType>, defaultKey: string): Key {
  if ('key' in column && column.key !== undefined) {
    return column.key;
  }
  if (column.dataIndex) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join(JOIN_KEY) : column.dataIndex;
  }

  return defaultKey;
}

function getMultiplePriority<RecordType>(column: ColumnType<RecordType>): number | false {
  if (typeof column.sorter === 'object' && typeof column.sorter.multiple === 'number') {
    return column.sorter.multiple;
  }
  return false;
}

function defaultSortFn<T>(a: T, b: T): number {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

function getSortFunction<RecordType>(
  sorter: ColumnType<RecordType>['sorter'],
): CompareFn<RecordType> | false {
  if (typeof sorter === 'function') {
    return sorter;
  }
  if (sorter && typeof sorter === 'object' && sorter.compare) {
    return sorter.compare;
  }
  return false;
}

function nextSortDirection(sortDirections: SortOrder[], current: SortOrder | null) {
  if (!current) {
    return sortDirections[0];
  }

  return sortDirections[sortDirections.indexOf(current) + 1];
}

interface SortState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  sortOrder: SortOrder;
  multiplePriority: number | false;
}

function collectSortStates<RecordType>(
  columns: ColumnsType<RecordType>,
  pos?: string,
): SortState<RecordType>[] {
  let sortStates: SortState<RecordType>[] = [];

  columns.forEach((column, index) => {
    const columnPos = pos ? `${pos}-${index}` : `${index}`;

    if ('children' in column) {
      sortStates = [...sortStates, ...collectSortStates(column.children, columnPos)];
    } else if ('sorter' in column && (columns as ColumnType<RecordType>).sortOrder) {
      sortStates.push({
        column,
        key: getColumnKey(column, columnPos),
        multiplePriority: getMultiplePriority(column),
        sortOrder: column.sortOrder!,
      });
    }
  });

  return sortStates;
}

function injectFilter<RecordType>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  sorterSates: SortState<RecordType>[],
  triggerSorter: (sorterSates: SortState<RecordType>) => void,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = pos ? `${pos}-${index}` : `${index}`;
    let newColumn: ColumnsType<RecordType>[number] = column;

    if ('sorter' in newColumn) {
      const sortDirections: SortOrder[] = newColumn.sortDirections || ['ascend', 'descend'];
      const columnKey = getColumnKey(newColumn, columnPos);
      const sorterState = sorterSates.find(({ key }) => key === columnKey);
      const sorterOrder = sorterState ? sorterState.sortOrder : null;

      const upNode: React.ReactNode = sortDirections.includes('ascend') && (
        <CaretUp
          className={classNames(`${prefixCls}-column-sorter-up`, {
            active: sorterOrder === 'ascend',
          })}
        />
      );
      const downNode: React.ReactNode = sortDirections.includes('descend') && (
        <CaretDown
          className={classNames(`${prefixCls}-column-sorter-down`, {
            active: sorterOrder === 'descend',
          })}
        />
      );

      newColumn = {
        ...newColumn,
        className: classNames(newColumn.className, `${prefixCls}-column-sort`),
        title: (
          <div className={`${prefixCls}-column-sorters`}>
            <span className={`${prefixCls}-column-title`}>{newColumn.title}</span>
            <span
              className={classNames(`${prefixCls}-column-sorter`, {
                [`${prefixCls}-column-sorter-full`]: upNode && downNode,
              })}
            >
              <span className={`${prefixCls}-column-sorter-inner`}>
                {upNode}
                {downNode}
              </span>
            </span>
          </div>
        ),
        onHeaderCell: col => {
          const cell: React.HTMLAttributes<HTMLElement> =
            (column.onHeaderCell && column.onHeaderCell(col)) || {};
          const originOnClick = cell.onClick;

          cell.onClick = (event: React.MouseEvent<HTMLElement>) => {
            triggerSorter({
              column,
              key: columnKey,
              sortOrder: nextSortDirection(sortDirections, sorterOrder),
              multiplePriority: getMultiplePriority(column),
            });

            if (originOnClick) {
              originOnClick(event);
            }
          };

          return cell;
        },
      };
    }

    if ('children' in newColumn) {
      newColumn = {
        ...newColumn,
        children: injectFilter(
          prefixCls,
          newColumn.children,
          sorterSates,
          triggerSorter,
          columnPos,
        ),
      };
    }

    return newColumn;
  });
}

interface FilterSorterConfig<RecordType> {
  prefixCls: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
}

export default function useFilterSorter<RecordType>({
  prefixCls,
  columns,
  data,
}: FilterSorterConfig<RecordType>): [TransformColumns<RecordType>, RecordType[]] {
  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>([]);

  const mergedSorterStates = React.useMemo(() => {
    const collectedStates = collectSortStates(columns);

    // Return if not controlled
    if (!collectedStates.length) {
      return sortStates;
    }

    const validateStates: SortState<RecordType>[] = [];

    for (let i = 0; i < collectedStates.length; i += 1) {
      const state = collectedStates[i];
      if (!validateStates.length) {
        validateStates.push(state);
        if (state.multiplePriority === false) {
          break;
        }
      } else if (state.multiplePriority !== false) {
        validateStates.push(state);
      } else {
        break;
      }
    }

    return validateStates;
  }, [columns, sortStates]);

  function triggerSorter(sortState: SortState<RecordType>) {
    if (!sortState.sortOrder) {
      setSortStates(mergedSorterStates.filter(({ key }) => key !== sortState.key));
    } else if (
      sortState.multiplePriority === false ||
      !mergedSorterStates.length ||
      mergedSorterStates[0].multiplePriority === false
    ) {
      setSortStates([sortState]);
    } else {
      setSortStates([...mergedSorterStates.filter(({ key }) => key !== sortState.key), sortState]);
    }
  }

  const transformColumns = React.useCallback(
    (innerColumns: ColumnsType<RecordType>) =>
      injectFilter(prefixCls, innerColumns, mergedSorterStates, triggerSorter),
    [mergedSorterStates],
  );

  const sortedData = React.useMemo(() => {
    const innerSorterStates = mergedSorterStates
      .slice()
      .sort((a, b) => (b.multiplePriority as number) - (a.multiplePriority as number));

    const cloneData = data.slice();

    return cloneData.sort((record1, record2) => {
      for (let i = 0; i < innerSorterStates.length; i += 1) {
        const sorterState = innerSorterStates[i];
        const {
          column: { sorter, dataIndex },
          sortOrder,
        } = sorterState;

        let compareResult: number;
        const compareFn = getSortFunction(sorter);

        if (compareFn === false) {
          const value1 = get(record1, toArray<string | number>(dataIndex));
          const value2 = get(record2, toArray<string | number>(dataIndex));
          compareResult = defaultSortFn(value1, value2);
        } else {
          compareResult = compareFn(record1, record2);
        }

        if (compareResult !== 0) {
          return sortOrder === 'ascend' ? compareResult : -compareResult;
        }
      }

      return 0;
    });
  }, [data, mergedSorterStates]);

  return [transformColumns, sortedData];
}
