import * as React from 'react';
import {
  TransformColumns,
  ColumnsType,
  ColumnType,
  ColumnTitleProps,
  Key,
  TableLocale,
} from '../../interface';
import { getColumnPos, renderColumnTitle, getColumnKey } from '../../util';
import FilterDropdown from './FilterDropdown';
import { ConfigContext } from '../../../config-provider';
import defaultLocale from '../../../locale/en_US';

export interface FilterState<RecordType> {
  column: ColumnType<RecordType>;
  key: Key;
  filteredKeys: Key[] | null;
}

function collectFilterStates<RecordType>(
  columns: ColumnsType<RecordType>,
  pos?: string,
): FilterState<RecordType>[] {
  let filterStates: FilterState<RecordType>[] = [];

  columns.forEach((column, index) => {
    const columnPos = getColumnPos(index, pos);

    if ('children' in column) {
      filterStates = [...filterStates, ...collectFilterStates(column.children, columnPos)];
    } else if ('filters' in column || 'filterDropdown' in column) {
      // Controlled
      filterStates.push({
        column,
        key: getColumnKey(column, columnPos),
        filteredKeys: column.filteredValue || null,
      });
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
  locale: TableLocale,
  pos?: string,
): ColumnsType<RecordType> {
  return columns.map((column, index) => {
    const columnPos = getColumnPos(index, pos);
    const { filterMultiple = true } = column as ColumnType<RecordType>;

    if ('filters' in column || 'filterDropdown' in column) {
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
    currentFilters[key] = filteredKeys;
  });

  return currentFilters;
}

interface FilterConfig<RecordType> {
  prefixCls: string;
  dropdownPrefixCls?: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
  onFilterChange: (filters: Record<string, Key[] | null>) => void;
}

function useFilter<RecordType>({
  prefixCls,
  dropdownPrefixCls = 'ant-dropdown',
  data,
  columns,
  onFilterChange,
}: FilterConfig<RecordType>): [
  TransformColumns<RecordType>,
  RecordType[],
  () => Record<string, Key[] | null>,
] {
  const { locale = defaultLocale } = React.useContext(ConfigContext);
  const tableLocale = (locale.Table || {}) as TableLocale;

  const [filterStates, setFilterStates] = React.useState<FilterState<RecordType>[]>(
    collectFilterStates(columns),
  );

  const mergedFilterStates = React.useMemo(() => {
    const collectedStates = collectFilterStates(columns);

    // Return if not controlled
    if (!collectedStates.length) {
      return filterStates;
    }

    return collectedStates;
  }, [columns, filterStates]);

  const getFilters = React.useCallback(() => generateFilterInfo(mergedFilterStates), [
    mergedFilterStates,
  ]);

  const triggerFilter = (filterState: FilterState<RecordType>) => {
    const newFilterStates = mergedFilterStates.filter(({ key }) => key !== filterState.key);
    newFilterStates.push(filterState);
    setFilterStates(newFilterStates);
    onFilterChange(generateFilterInfo(newFilterStates));
  };

  const filteredData = React.useMemo<RecordType[]>(() => {
    return mergedFilterStates.reduce((currentData, filterState) => {
      const {
        column: { onFilter },
        filteredKeys,
      } = filterState;
      if (onFilter && filteredKeys) {
        return currentData.filter(record => filteredKeys.some(key => onFilter(key, record)));
      }
      return currentData;
    }, data);
  }, [data, mergedFilterStates]);

  const transformColumns = React.useMemo(() => {
    return (innerColumns: ColumnsType<RecordType>) =>
      injectFilter(
        prefixCls,
        dropdownPrefixCls,
        innerColumns,
        mergedFilterStates,
        triggerFilter,
        tableLocale,
      );
  }, [mergedFilterStates]);

  return [transformColumns, filteredData, getFilters];
}

export default useFilter;
