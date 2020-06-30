import * as React from 'react';
import {
  TransformColumns,
  ColumnsType,
  ColumnType,
  ColumnTitleProps,
  Key,
  TableLocale,
  GetPopupContainer,
  ColumnFilterItem,
} from '../../interface';
import { getColumnPos, renderColumnTitle, getColumnKey } from '../../util';
import FilterDropdown from './FilterDropdown';

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  filteredKeys?: Key[] | null;
  forceFiltered?: boolean;
}

function collectFilterStates<RecordType>(
  columns: ColumnsType<RecordType>,
  init: boolean,
  pos?: string,
): FilterState<RecordType>[] {
  let filterStates: FilterState<RecordType>[] = [];

  (columns || []).forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('children' in column) {
      filterStates = [...filterStates, ...collectFilterStates(column.children, init, columnPos)];
    } else if (column.filters || 'filterDropdown' in column || 'onFilter' in column) {
      if ('filteredValue' in column) {
        // Controlled
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: column.filteredValue,
          forceFiltered: column.filtered,
        });
      } else {
        // Uncontrolled
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys:
            init && column.defaultFilteredValue ? column.defaultFilteredValue! : undefined,
          forceFiltered: column.filtered,
        });
      }
    }
  });

  return filterStates;
}

function injectFilter<RecordType>(
  prefixCls: string,
  dropdownPrefixCls: string,
  columns: ColumnsType<RecordType>,
  filterStates: FilterState<RecordType>[],
  triggerFilter: (filterState: FilterState<RecordType>) => void,
  getPopupContainer: GetPopupContainer | undefined,
  locale: TableLocale,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const { filterMultiple = true } = column as ColumnType<RecordType>;

    if (column.filters || 'filterDropdown' in column) {
      const columnKey = getColumnKey(column, columnPos);
      const filterState = filterStates.find(({ key }) => columnKey === key);

      return {
        ...column,
        title: (renderProps: ColumnTitleProps<RecordType>) => (
          <FilterDropdown
            prefixCls={`${prefixCls}-filter`}
            dropdownPrefixCls={dropdownPrefixCls}
            column={column}
            columnKey={columnKey}
            filterState={filterState}
            filterMultiple={filterMultiple}
            triggerFilter={triggerFilter}
            locale={locale}
            getPopupContainer={getPopupContainer}
          >
            {renderColumnTitle(column.title, renderProps)}
          </FilterDropdown>
        ),
      };
    }

    if ('children' in column) {
      return {
        ...column,
        children: injectFilter(
          prefixCls,
          dropdownPrefixCls,
          column.children,
          filterStates,
          triggerFilter,
          getPopupContainer,
          locale,
          columnPos,
        ),
      };
    }

    return column;
  });
}

function generateFilterInfo<RecordType>(filterStates: FilterState<RecordType>[]) {
  const currentFilters: Record<string, Key[] | null> = {};

  filterStates.forEach(({ key, filteredKeys }) => {
    currentFilters[key] = filteredKeys || null;
  });

  return currentFilters;
}

function flattenKeys(filters?: ColumnFilterItem[]) {
  let keys: (string | number | boolean)[] = [];
  (filters || []).forEach(({ value, children }) => {
    keys.push(value);
    if (children) {
      keys = [...keys, ...flattenKeys(children)];
    }
  });
  return keys;
}

export function getFilterData<RecordType>(
  data: RecordType[],
  filterStates: FilterState<RecordType>[],
) {
  return filterStates.reduce((currentData, filterState) => {
    const {
      column: { onFilter, filters },
      filteredKeys,
    } = filterState;
    if (onFilter && filteredKeys && filteredKeys.length) {
      return currentData.filter(record =>
        filteredKeys.some(key => {
          const keys = flattenKeys(filters);
          const keyIndex = keys.findIndex(k => String(k) === String(key));
          const realKey = keyIndex !== -1 ? keys[keyIndex] : key;
          return onFilter(realKey, record);
        }),
      );
    }
    return currentData;
  }, data);
}

interface FilterConfig<RecordType> {
  prefixCls: string;
  dropdownPrefixCls: string;
  mergedColumns: ColumnsType<RecordType>;
  locale: TableLocale;
  onFilterChange: (
    filters: Record<string, Key[] | null>,
    filterStates: FilterState<RecordType>[],
  ) => void;
  getPopupContainer?: GetPopupContainer;
}

function useFilter<RecordType>({
  prefixCls,
  dropdownPrefixCls,
  mergedColumns,
  onFilterChange,
  getPopupContainer,
  locale: tableLocale,
}: FilterConfig<RecordType>): [
  TransformColumns<RecordType>,
  FilterState<RecordType>[],
  () => Record<string, Key[] | null>,
] {
  const [filterStates, setFilterStates] = React.useState<FilterState<RecordType>[]>(
    collectFilterStates(mergedColumns, true),
  );

  const mergedFilterStates = React.useMemo(() => {
    const collectedStates = collectFilterStates(mergedColumns, false);

    // Return if not controlled
    if (collectedStates.every(({ filteredKeys }) => filteredKeys === undefined)) {
      return filterStates;
    }

    return collectedStates;
  }, [mergedColumns, filterStates]);

  const getFilters = React.useCallback(() => generateFilterInfo(mergedFilterStates), [
    mergedFilterStates,
  ]);

  const triggerFilter = (filterState: FilterState<RecordType>) => {
    const newFilterStates = mergedFilterStates.filter(({ key }) => key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates), newFilterStates);
  };

  const transformColumns = (innerColumns: ColumnsType<RecordType>) =>
    injectFilter(
      prefixCls,
      dropdownPrefixCls,
      innerColumns,
      mergedFilterStates,
      triggerFilter,
      getPopupContainer,
      tableLocale,
    );

  return [transformColumns, mergedFilterStates, getFilters];
}

export default useFilter;
