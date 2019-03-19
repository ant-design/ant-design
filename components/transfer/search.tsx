import * as React from 'react';
import Icon from '../icon';
import Input from '../input';

export interface TransferSearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<any>) => void;
  handleClear?: (e: React.MouseEvent<any>) => void;
  value?: any;
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
          <Icon type="close-circle" theme="filled" />
        </a>
      ) : (
        <span className={`${prefixCls}-action`}>
          <Icon type="search" />
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
