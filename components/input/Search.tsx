import React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';
import Button from '../button';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (value: string) => any;
  enterButton?: boolean | React.ReactNode;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-search',
    enterButton: false,
  };

  private input: Input;

  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.input.value);
    }
    this.input.focus();
  }

  saveInput = (node) => {
    this.input = node;
  }

  render() {
    const { className, prefixCls, inputPrefixCls, size, enterButton, ...others } = this.props;
    delete (others as any).onSearch;
    const searchSuffix = enterButton
      ? (
        <Button
          className={`${prefixCls}-button`}
          type="primary"
          size={size}
          onClick={this.onSearch}
        >
          {enterButton === true ? <Icon type="search" /> : enterButton}
        </Button>
      ) : <Icon className={`${prefixCls}-icon`} type="search" />;
    const inputClassName = classNames(prefixCls, className, {
      [`${prefixCls}-enter-button`]: !!enterButton,
      [`${prefixCls}-${size}`]: !!size,
    });
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        size={size}
        className={inputClassName}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={this.saveInput}
      />
    );
  }
}
