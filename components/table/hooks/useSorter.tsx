import * as React from 'react';
import classNames from 'classnames';
import { CaretDown, CaretUp } from '@ant-design/icons';
import {
  TransformColumns,
  ColumnsType,
  Key,
  ColumnType,
  SortOrder,
  CompareFn,
  ColumnTitleProps,
  SorterResult,
} from '../interface';
import { getColumnKey, getColumnPos, renderColumnTitle } from '../util';

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
  sortOrder: SortOrder | null;
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
      if ('sortOrder' in column) {
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
        className: classNames(newColumn.className, { [`${prefixCls}-column-sort`]: sorterOrder }),
        title: (renderProps: ColumnTitleProps<RecordType>) => (
          <div className={`${prefixCls}-column-sorters`}>
            <span>{renderColumnTitle(column.title, renderProps)}</span>
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

          cell.className = classNames(cell.className, `${prefixCls}-column-has-sorters`);

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

function generateSorterInfo<RecordType>(
  sorterStates: SortState<RecordType>[],
): SorterResult<RecordType> | SorterResult<RecordType>[] {
  const list = sorterStates
    .filter(({ sortOrder }) => sortOrder)
    .map(
      ({ column, sortOrder }): SorterResult<RecordType> => {
        return { column, order: sortOrder, field: column.dataIndex, columnKey: column.key };
      },
    );

  // Legacy compatible support
  if (list.length <= 1) {
    return list[0] || {};
  }

  return list;
}

interface SorterConfig<RecordType> {
  prefixCls: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
  onSorterChange: (sorterResult: SorterResult<RecordType> | SorterResult<RecordType>[]) => void;
}

export default function useFilterSorter<RecordType>({
  prefixCls,
  columns,
  data,
  onSorterChange,
}: SorterConfig<RecordType>): [
  TransformColumns<RecordType>,
  RecordType[],
  ColumnTitleProps<RecordType>,
  () => SorterResult<RecordType> | SorterResult<RecordType>[],
] {
  const [sortStates, setSortStates] = React.useState<SortState<RecordType>[]>(
    collectSortStates(columns, true),
  );

  const mergedSorterStates = React.useMemo(() => {
    let validate = true;
    const collectedStates = collectSortStates(columns, false);

    // Return if not controlled
    if (!collectedStates.length) {
      return sortStates;
    }

    const validateStates: SortState<RecordType>[] = [];

    function patchStates(state: SortState<RecordType>) {
      if (validate) {
        validateStates.push(state);
      } else {
        validateStates.push({
          ...state,
          sortOrder: null,
        });
      }
    }

    let multipleMode: boolean | null = null;
    collectedStates.forEach(state => {
      if (multipleMode === null) {
        patchStates(state);

        if (state.sortOrder) {
          if (state.multiplePriority === false) {
            validate = false;
          } else {
            multipleMode = true;
          }
        }
      } else if (multipleMode && state.multiplePriority !== false) {
        patchStates(state);
      } else {
        validate = false;
        patchStates(state);
      }
    });

    return validateStates;
  }, [columns, sortStates]);

  // Get render columns title required props
  const columnTitleSorterProps = React.useMemo<ColumnTitleProps<RecordType>>(() => {
    const sortColumns = mergedSorterStates.map(({ column, sortOrder }) => ({
      column,
      order: sortOrder,
    }));

    return {
      sortColumns,
      // Legacy
      sortColumn: sortColumns[0] && sortColumns[0].column,
      sortOrder: sortColumns[0] && sortColumns[0].order,
    };
  }, [mergedSorterStates]);

  function triggerSorter(sortState: SortState<RecordType>) {
    let newSorterStates;

    if (!sortState.sortOrder) {
      newSorterStates = mergedSorterStates.filter(({ key }) => key !== sortState.key);
    } else if (
      sortState.multiplePriority === false ||
      !mergedSorterStates.length ||
      mergedSorterStates[0].multiplePriority === false
    ) {
      newSorterStates = [sortState];
    } else {
      newSorterStates = [
        ...mergedSorterStates.filter(({ key }) => key !== sortState.key),
        sortState,
      ];
    }
    setSortStates(newSorterStates);

    onSorterChange(generateSorterInfo(newSorterStates));
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

        if (compareFn && sortOrder) {
          const compareResult = compareFn(record1, record2);

          if (compareResult !== 0) {
            return sortOrder === 'ascend' ? compareResult : -compareResult;
          }
        }
      }

      return 0;
    });
  }, [data, mergedSorterStates]);

  const getSorters = () => {
    return generateSorterInfo(mergedSorterStates);
  };

  return [transformColumns, sortedData, columnTitleSorterProps, getSorters];
}
