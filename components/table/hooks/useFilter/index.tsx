import * as React from 'react';

import type { AnyObject } from '../../../_util/type';
import { devUseWarning } from '../../../_util/warning';
import type {
  ColumnsType,
  ColumnTitleProps,
  ColumnType,
  FilterKey,
  FilterValue,
  GetPopupContainer,
  Key,
  SafeKey,
  TableLocale,
  TransformColumns,
} from '../../interface';
import { getColumnKey, getColumnPos, getColumnPosList, renderColumnTitle } from '../../util';
import FilterDropdown, { flattenKeys } from './FilterDropdown';

export interface FilterState<RecordType = AnyObject> {
  column: ColumnType<RecordType>;
  key: Key;
  filteredKeys?: FilterKey;
  forceFiltered?: boolean;
}

const collectFilterStates = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  init: boolean,
  pos?: string,
): FilterState<RecordType>[] => {
  let filterStates: FilterState<RecordType>[] = [];

  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const filterDropdownIsDefined = column.filterDropdown !== undefined;

    if (column.filters || filterDropdownIsDefined || 'onFilter' in column) {
      if ('filteredValue' in column) {
        // Controlled
        let filteredValues = column.filteredValue;
        if (!filterDropdownIsDefined) {
          filteredValues = filteredValues?.map(String) ?? filteredValues;
        }
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: filteredValues as FilterKey,
          forceFiltered: column.filtered,
        });
      } else {
        // Uncontrolled
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: (init && column.defaultFilteredValue
            ? column.defaultFilteredValue!
            : undefined) as FilterKey,
          forceFiltered: column.filtered,
        });
      }
    }

    if ('children' in column) {
      filterStates = [...filterStates, ...collectFilterStates(column.children, init, columnPos)];
    }
  });

  return filterStates;
};

function injectFilter<RecordType extends AnyObject = AnyObject>(
  prefixCls: string,
  dropdownPrefixCls: string,
  columns: ColumnsType<RecordType>,
  filterStates: FilterState<RecordType>[],
  locale: TableLocale,
  triggerFilter: (filterState: FilterState<RecordType>) => void,
  getPopupContainer?: GetPopupContainer,
  pos?: string,
  rootClassName?: string,
  columnPosList?: string[],
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = columnPosList?.[index] ?? getColumnPos(index, pos);
    const {
      filterOnClose = true,
      filterMultiple = true,
      filterMode,
      filterSearch,
    } = column as ColumnType<RecordType>;

    let newColumn: ColumnsType<RecordType>[number] = column;

    if (newColumn.filters || newColumn.filterDropdown) {
      const columnKey = getColumnKey(newColumn, columnPos);
      const filterState = filterStates.find(({ key }) => columnKey === key);

      newColumn = {
        ...newColumn,
        title: (renderProps: ColumnTitleProps<RecordType>) => (
          <FilterDropdown
            tablePrefixCls={prefixCls}
            prefixCls={`${prefixCls}-filter`}
            dropdownPrefixCls={dropdownPrefixCls}
            column={newColumn}
            columnKey={columnKey}
            filterState={filterState}
            filterOnClose={filterOnClose}
            filterMultiple={filterMultiple}
            filterMode={filterMode}
            filterSearch={filterSearch}
            triggerFilter={triggerFilter}
            locale={locale}
            getPopupContainer={getPopupContainer}
            rootClassName={rootClassName}
          >
            {renderColumnTitle<RecordType>(column.title, renderProps)}
          </FilterDropdown>
        ),
      };
    }

    if ('children' in newColumn) {
      newColumn = {
        ...newColumn,
        children: injectFilter(
          prefixCls,
          dropdownPrefixCls,
          newColumn.children,
          filterStates,
          locale,
          triggerFilter,
          getPopupContainer,
          columnPos,
          rootClassName,
        ),
      };
    }

    return newColumn;
  });
}

const generateFilterInfo = <RecordType extends AnyObject = AnyObject>(
  filterStates: FilterState<RecordType>[],
) => {
  const currentFilters: Record<string, FilterValue | null> = {};

  filterStates.forEach(({ key, filteredKeys, column }) => {
    const keyAsString = key as SafeKey;
    const { filters, filterDropdown } = column;
    if (filterDropdown) {
      currentFilters[keyAsString] = filteredKeys || null;
    } else if (Array.isArray(filteredKeys)) {
      const keys = flattenKeys(filters);
      currentFilters[keyAsString] = keys.filter((originKey) =>
        filteredKeys.includes(String(originKey)),
      );
    } else {
      currentFilters[keyAsString] = null;
    }
  });

  return currentFilters;
};

export const getFilterData = <RecordType extends AnyObject = AnyObject>(
  data: RecordType[],
  filterStates: FilterState<RecordType>[],
  childrenColumnName: string,
) => {
  const filterDatas = filterStates.reduce<RecordType[]>((currentData, filterState) => {
    const {
      column: { onFilter, filters },
      filteredKeys,
    } = filterState;

    if (onFilter && filteredKeys && filteredKeys.length) {
      // Preprocess the keys corresponding to the filter tree,
      // use Map to improve lookup performance to O(1).
      const flatKeys = flattenKeys(filters);
      const keyMap = new Map<string, FilterValue[number]>();
      flatKeys.forEach((k) => {
        const strKey = String(k);
        if (!keyMap.has(strKey)) {
          keyMap.set(strKey, k);
        }
      });

      const realKeys = filteredKeys.map((key) => {
        const strKey = String(key);
        return keyMap.get(strKey) ?? key;
      });

      const internalFilter = (subset: RecordType[]): RecordType[] =>
        subset.reduce<RecordType[]>((acc, record) => {
          const clonedRecord = { ...record } as any;

          if (clonedRecord[childrenColumnName]) {
            clonedRecord[childrenColumnName] = getFilterData(
              clonedRecord[childrenColumnName],
              filterStates,
              childrenColumnName,
            );
          }

          if (realKeys.some((realKey) => onFilter(realKey, clonedRecord))) {
            acc.push(clonedRecord);
          }
          return acc;
        }, []);

      return internalFilter(currentData);
    }

    return currentData;
  }, data);

  return filterDatas;
};

export interface FilterConfig<RecordType = AnyObject> {
  prefixCls: string;
  dropdownPrefixCls: string;
  mergedColumns: ColumnsType<RecordType>;
  /** Columns before applying the responsive filter. */
  baseColumns?: ColumnsType<RecordType>;
  locale: TableLocale;
  onFilterChange: (
    filters: Record<string, FilterValue | null>,
    filterStates: FilterState<RecordType>[],
  ) => void;
  getPopupContainer?: GetPopupContainer;
  rootClassName?: string;
}

const getColumnKeyMap = <RecordType extends AnyObject = AnyObject>(
  columns: ColumnsType<RecordType>,
  pos?: string,
  keyMap = new Map<Key, ColumnsType<RecordType>[number]>(),
) => {
  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const key = getColumnKey(column, columnPos);
    if (!keyMap.has(key)) {
      keyMap.set(key, column);
    }
    if ('children' in column) {
      getColumnKeyMap(column.children, columnPos, keyMap);
    }
  });
  return keyMap;
};

const useFilter = <RecordType extends AnyObject = AnyObject>(
  props: FilterConfig<RecordType>,
): [
  TransformColumns<RecordType>,
  FilterState<RecordType>[],
  Record<string, FilterValue | null>,
] => {
  const {
    prefixCls,
    dropdownPrefixCls,
    mergedColumns,
    baseColumns,
    onFilterChange,
    getPopupContainer,
    locale: tableLocale,
    rootClassName,
  } = props;
  const warning = devUseWarning('Table');

  const collectColumns = baseColumns ?? mergedColumns;

  const [filterStates, setFilterStates] = React.useState<FilterState<RecordType>[]>(() =>
    collectFilterStates(collectColumns, true),
  );

  const mergedFilterStates = React.useMemo(() => {
    const collectedStates = collectFilterStates(collectColumns, false);
    if (collectedStates.length === 0) {
      return collectedStates;
    }
    let filteredKeysIsAllNotControlled = true;
    let filteredKeysIsAllControlled = true;
    collectedStates.forEach(({ filteredKeys }) => {
      if (filteredKeys !== undefined) {
        filteredKeysIsAllNotControlled = false;
      } else {
        filteredKeysIsAllControlled = false;
      }
    });

    // Return if not controlled
    if (filteredKeysIsAllNotControlled) {
      // Filter column may have been removed
      const columnKeyMap = getColumnKeyMap(collectColumns);
      return filterStates.reduce<FilterState<RecordType>[]>((list, item) => {
        const col = columnKeyMap.get(item.key);
        if (col) {
          list.push({
            ...item,
            column: {
              ...item.column,
              ...col,
            },
            forceFiltered: col.filtered,
          });
        }
        return list;
      }, []);
    }

    warning(
      filteredKeysIsAllControlled,
      'usage',
      'Columns should all contain `filteredValue` or not contain `filteredValue`.',
    );

    return collectedStates;
  }, [collectColumns, filterStates]);

  const filters = React.useMemo(
    () => generateFilterInfo<RecordType>(mergedFilterStates),
    [mergedFilterStates],
  );

  const triggerFilter = (filterState: FilterState<RecordType>) => {
    const newFilterStates = mergedFilterStates.filter(({ key }) => key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo<RecordType>(newFilterStates), newFilterStates);
  };

  const transformColumns = (innerColumns: ColumnsType<RecordType>) =>
    injectFilter(
      prefixCls,
      dropdownPrefixCls,
      innerColumns,
      mergedFilterStates,
      tableLocale,
      triggerFilter,
      getPopupContainer,
      undefined,
      rootClassName,
      getColumnPosList(innerColumns, mergedColumns, collectColumns),
    );

  return [transformColumns, mergedFilterStates, filters] as const;
};

export { flattenKeys };

export default useFilter;
