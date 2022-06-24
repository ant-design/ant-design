import SearchOutlined from '@ant-design/icons/SearchOutlined';
import * as React from 'react';
import Input from '../../../input';
import type { FilterSearchType, TableLocale } from '../../interface';

interface FilterSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch: FilterSearchType;
  tablePrefixCls: string;
  locale: TableLocale;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  value,
  onChange,
  filterSearch,
  tablePrefixCls,
  locale,
}) => {
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
};

export default FilterSearch;
