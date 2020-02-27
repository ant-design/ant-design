import * as React from 'react';
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons';

import Input from '../input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  handleClear?: (e: React.MouseEvent<HTMLElement>) => void;
  value?: string;
  disabled?: boolean;
}

export default class Search extends React.Component<TransferSearchProps, any> {
  static defaultProps = {
    placeholder: '',
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  handleClear = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { handleClear, disabled } = this.props;
    if (!disabled && handleClear) {
      handleClear(e);
    }
  };

  render() {
    const { placeholder, value, prefixCls, disabled } = this.props;
    const icon =
      value && value.length > 0 ? (
        <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
          <CloseCircleFilled />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <SearchOutlined />
        </span>
      );

    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={value}
          onChange={this.handleChange}
          disabled={disabled}
        />
        {icon}
      </div>
    );
  }
}
