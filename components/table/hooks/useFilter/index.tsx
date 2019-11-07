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
  filteredKeys: Key[];
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
    } else if ('sorter' in column) {
      if (column.filteredValue) {
        // Controlled
        filterStates.push({
          column,
          key: getColumnKey(column, columnPos),
          filteredKeys: column.filteredValue,
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

interface FilterConfig<RecordType> {
  prefixCls: string;
  dropdownPrefixCls?: string;
  columns: ColumnsType<RecordType>;
  data: RecordType[];
}

function useFilter<RecordType>({
  prefixCls,
  dropdownPrefixCls = 'ant-dropdown',
  data,
  columns,
}: FilterConfig<RecordType>): [TransformColumns<RecordType>, RecordType[]] {
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

  const triggerFilter = (filterState: FilterState<RecordType>) => {
    const newFilterStates = mergedFilterStates.filter(({ key }) => key !== filterState.key);
    if (filterState.filteredKeys.length) {
      newFilterStates.push(filterState);
    }
    setFilterStates(newFilterStates);
  };

  const filteredData = React.useMemo<RecordType[]>(() => {
    return mergedFilterStates.reduce((currentData, filterState) => {
      const {
        column: { onFilter },
        filteredKeys,
      } = filterState;
      if (onFilter) {
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

  return [transformColumns, filteredData];
}

export default useFilter;
