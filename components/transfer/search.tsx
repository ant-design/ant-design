import React from 'react';
import Icon from '../icon';
import Input from '../input';

export interface SearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<any>) => void;
  handleClear?: (e: React.MouseEvent<any>) => void;
  value?: any;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    placeholder: '',
  };

  inputRef: HTMLElement;

  handleChange = (e) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(e);
    }
  }

  handleClear = (e) => {
    e.preventDefault();

    const handleClear = this.props.handleClear;
    if (handleClear) {
      handleClear(e);
    }
  }

  saveInput = (node) => {
    this.inputRef = node;
  }

  render() {
    const { placeholder, value, prefixCls } = this.props;

    const icon = value && value.length > 0 ? (
      <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
        <Icon type="cross-circle" />
      </a>
    ) : (
      <span className={`${prefixCls}-action`}><Icon type="search" /></span>
    );

    return (
      <div>
        <Input
          placeholder={placeholder}
          className={prefixCls}
          value={value}
          ref={this.saveInput}
          onChange={this.handleChange}
        />
        {icon}
      </div>
    );
  }
}
