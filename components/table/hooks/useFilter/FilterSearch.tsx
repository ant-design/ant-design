import * as React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Input from '../../../input';

interface FilterSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterSearch: Boolean;
  tablePrefixCls: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  value,
  onChange,
  filterSearch,
  tablePrefixCls,
}) => {
  if (!filterSearch) {
    return null;
  }
  return (
    <div className={`${tablePrefixCls}-filter-dropdown-search`}>
      <Input
        prefix={<SearchOutlined />}
        placeholder="Search"
        onChange={onChange}
        value={value}
        className={`${tablePrefixCls}-filter-dropdown-search-input`}
      />
    </div>
  );
};

export default FilterSearch;
