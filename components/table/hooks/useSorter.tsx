import * as React from 'react';
import classNames from 'classnames';
import { CaretDown, CaretUp } from '@ant-design/icons';
import { TransformColumns, ColumnsType, Key, ColumnType, SortOrder, CompareFn } from '../interface';
import { getColumnKey, getColumnPos } from '../util';

function getMultiplePriority<RecordType>(column: ColumnType<RecordType>): number | false {
  if (typeof column.sorter === 'object' && typeof column.sorter.multiple === 'number') {
    return column.sorter.multiple;
  }
  return false;
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
  init: boolean,
  pos?: string,
): SortState<RecordType>[] {
  let sortStates: SortState<RecordType>[] = [];

  columns.forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('children' in column) {
      sortStates = [...sortStates, ...collectSortStates(column.children, init, columnPos)];
    } else if ('sorter' in column) {
      if (column.sortOrder) {
        // Controlled
        sortStates.push({
          column,
          key: getColumnKey(column, columnPos),
          multiplePriority: getMultiplePriority(column),
          sortOrder: column.sortOrder!,
        });
      } else if (init && column.defaultSortOrder) {
        // Default sorter
        sortStates.push({
          column,
          key: getColumnKey(column, columnPos),
          multiplePriority: getMultiplePriority(column),
          sortOrder: column.defaultSortOrder!,
        });
      }
    }
  });

  return sortStates;
}

function injectSorter<RecordType>(
  prefixCls: string,
  columns: ColumnsType<RecordType>,
  sorterSates: SortState<RecordType>[],
  triggerSorter: (sorterSates: SortState<RecordType>) => void,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);
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
        children: injectSorter(
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

interface SorterConfig<RecordType> {
  prefixCls: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
}

export default function useFilterSorter<RecordType>({
  prefixCls,
  columns,
  data,
}: SorterConfig<RecordType>): [TransformColumns<RecordType>, RecordType[]] {
  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>(
    collectSortStates(columns, true),
  );

  const mergedSorterStates = React.useMemo(() => {
    const collectedStates = collectSortStates(columns, false);

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
      injectSorter(prefixCls, innerColumns, mergedSorterStates, triggerSorter),
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
          column: { sorter },
          sortOrder,
        } = sorterState;

        const compareFn = getSortFunction(sorter);

        if (compareFn) {
          const compareResult = compareFn(record1, record2);

          if (compareResult !== 0) {
            return sortOrder === 'ascend' ? compareResult : -compareResult;
          }
        }
      }

      return 0;
    });
  }, [data, mergedSorterStates]);

  return [transformColumns, sortedData];
}
