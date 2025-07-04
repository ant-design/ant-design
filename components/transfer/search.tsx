import * as React from 'react';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Input from '../input/Input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
