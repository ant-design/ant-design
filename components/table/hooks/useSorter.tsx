import * as React from 'react';
import classNames from 'classnames';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
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

export interface SortState<RecordType> {
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

  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('children' in column) {
      sortStates = [...sortStates, ...collectSortStates(column.children, init, columnPos)];
    } else if (column.sorter) {
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
  defaultSortDirections: SortOrder[],
  pos?: string,
): ColumnsType<RecordType> {
  return (columns || []).map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    let newColumn: ColumnsType<RecordType>[number] = column;

    if (newColumn.sorter) {
      const sortDirections: SortOrder[] = newColumn.sortDirections || defaultSortDirections;
      const columnKey = getColumnKey(newColumn, columnPos);
      const sorterState = sorterSates.find(({ key }) => key === columnKey);
      const sorterOrder = sorterState ? sorterState.sortOrder : null;

      const upNode: React.ReactNode = sortDirections.includes('ascend') && (
        <CaretUpOutlined
          className={classNames(`${prefixCls}-column-sorter-up`, {
            active: sorterOrder === 'ascend',
          })}
        />
      );
      const downNode: React.ReactNode = sortDirections.includes('descend') && (
        <CaretDownOutlined
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
          defaultSortDirections,
          columnPos,
        ),
      };
    }

    return newColumn;
  });
}

function stateToInfo<RecordType>(sorterStates: SortState<RecordType>) {
  const { column, sortOrder } = sorterStates;
  return { column, order: sortOrder, field: column.dataIndex, columnKey: column.key };
}

function generateSorterInfo<RecordType>(
  sorterStates: SortState<RecordType>[],
): SorterResult<RecordType> | SorterResult<RecordType>[] {
  const list = sorterStates.filter(({ sortOrder }) => sortOrder).map(stateToInfo);

  // =========== Legacy compatible support ===========
  // https://github.com/ant-design/ant-design/pull/19226
  if (list.length === 0 && sorterStates.length) {
    return {
      ...stateToInfo(sorterStates[0]),
      column: undefined,
    };
  }

  if (list.length <= 1) {
    return list[0] || {};
  }

  return list;
}

export function getSortData<RecordType>(
  data: RecordType[],
  sortStates: SortState<RecordType>[],
  childrenColumnName: string,
): RecordType[] {
  const innerSorterStates = sortStates
    .slice()
    .sort((a, b) => (b.multiplePriority as number) - (a.multiplePriority as number));

  const cloneData = data.slice();

  const runningSorters = innerSorterStates.filter(({ column: { sorter }, sortOrder }) => {
    return getSortFunction(sorter) && sortOrder;
  });

  // Skip if no sorter needed
  if (!runningSorters.length) {
    return cloneData;
  }

  return cloneData
    .sort((record1, record2) => {
      for (let i = 0; i < runningSorters.length; i += 1) {
        const sorterState = runningSorters[i];
        const {
          column: { sorter },
          sortOrder,
        } = sorterState;

        const compareFn = getSortFunction(sorter);

        if (compareFn && sortOrder) {
          const compareResult = compareFn(record1, record2, sortOrder);

          if (compareResult !== 0) {
            return sortOrder === 'ascend' ? compareResult : -compareResult;
          }
        }
      }

      return 0;
    })
    .map<RecordType>(record => {
      const subRecords = (record as any)[childrenColumnName];
      if (subRecords) {
        return {
          ...record,
          [childrenColumnName]: getSortData(subRecords, sortStates, childrenColumnName),
        };
      }
      return record;
    });
}

interface SorterConfig<RecordType> {
  prefixCls: string;
  columns: ColumnsType<RecordType>;
  onSorterChange: (
    sorterResult: SorterResult<RecordType> | SorterResult<RecordType>[],
    sortStates: SortState<RecordType>[],
  ) => void;
  sortDirections: SortOrder[];
}

export default function useFilterSorter<RecordType>({
  prefixCls,
  columns,
  onSorterChange,
  sortDirections,
}: SorterConfig<RecordType>): [
  TransformColumns<RecordType>,
  SortState<RecordType>[],
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

    if (
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
    onSorterChange(generateSorterInfo(newSorterStates), newSorterStates);
  }

  const transformColumns = (innerColumns: ColumnsType<RecordType>) =>
    injectSorter(prefixCls, innerColumns, mergedSorterStates, triggerSorter, sortDirections);

  const getSorters = () => {
    return generateSorterInfo(mergedSorterStates);
  };

  return [transformColumns, mergedSorterStates, columnTitleSorterProps, getSorters];
}
