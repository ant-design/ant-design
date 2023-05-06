import SearchOutlined from '@ant-design/icons/SearchOutlined';
import * as React from 'react';

import Input from '../input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  handleClear?: () => void;
  value?: string;
  disabled?: boolean;
}

const Search: React.FC<TransferSearchProps> = (props) => {
  const { placeholder = '', value, prefixCls, disabled, onChange, handleClear } = props;

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      if (e.target.value === '') {
        handleClear?.();
      }
    },
    [onChange],
  );

  return (
    <Input
      placeholder={placeholder}
      className={prefixCls}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      allowClear
      prefix={<SearchOutlined />}
    />
  );
};

if (process.env.NODE_ENV !== 'production') {
  Search.displayName = 'Search';
}

export default Search;
