import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';

export interface SearchProps {
  className?: string;
  placeholder?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  defaultValue?: any;
  value?: any;
  onChange?: React.FormEventHandler<any>;
  onSearch?: (value: string) => any;
  size?: 'large' | 'default' | 'small';
  disabled?: boolean;
  readOnly?: boolean;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    prefixCls: 'ant-input-search',
    onSearch() {},
  };
  input: any;
  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.input.refs.input.value);
    }
    this.input.refs.input.focus();
  }
  render() {
    const { className, prefixCls, ...others } = this.props;
    delete others.onSearch;
    const searchSuffix = (
      <Icon
        className={`${prefixCls}-icon`}
        onClick={this.onSearch}
        type="search"
      />
    );
    return (
      <Input
        className={classNames(prefixCls, className)}
        onPressEnter={this.onSearch}
        ref={node => this.input = node}
        suffix={searchSuffix}
        {...others}
      />
    );
  }
}
