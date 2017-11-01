import React from 'react';
import classNames from 'classnames';
import Input, { InputProps } from './Input';
import Icon from '../icon';

export interface SearchProps extends InputProps {
  inputPrefixCls?: string;
  onSearch?: (value: string) => any;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    inputPrefixCls: 'ant-input',
    prefixCls: 'ant-input-search',
  };
  input: any;
  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.refs.input.value);
    }
    this.input.focus();
  }
  render() {
    const { className, inputPrefixCls, prefixCls, suffix, ...others } = this.props;
    delete (others as any).onSearch;
    const searchIcon = (
      <Icon
        className={`${prefixCls}-icon`}
        onClick={this.onSearch}
        type="search"
        key="searchIcon"
      />
    );
    const searchSuffix = suffix ? [suffix, searchIcon] : searchIcon;
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        className={classNames(prefixCls, className)}
        prefixCls={inputPrefixCls}
        suffix={searchSuffix}
        ref={node => this.input = node}
      />
    );
  }
}
