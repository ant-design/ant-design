import SearchOutlined from '@ant-design/icons/SearchOutlined';
import * as React from 'react';
import Input from '../../../input';
import type { FilterSearchType, TableLocale } from '../../interface';

interface FilterSearchProps<RecordType = any> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch: FilterSearchType<RecordType>;
  tablePrefixCls: string;
  locale: TableLocale;
}

function FilterSearch<RecordType>({
  value,
  onChange,
  filterSearch,
  tablePrefixCls,
  locale,
}: FilterSearchProps<RecordType>) {
  if (!filterSearch) {
    return null;
  }
  return (
    <div className={`${tablePrefixCls}-filter-dropdown-search`}>
      <Input
        prefix={<SearchOutlined />}
        placeholder={locale.filterSearchPlaceholder}
        onChange={onChange}
        value={value}
        // for skip min-width of input
        htmlSize={1}
        className={`${tablePrefixCls}-filter-dropdown-search-input`}
      />
    </div>
  );
}

export default FilterSearch;
