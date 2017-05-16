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
  onSearch?: (value: string) => any;
  onChange?: React.FormEventHandler<any>;
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
    delete (others as any).onSearch;
    const searchSuffix = (
      <Icon
        className={`${prefixCls}-icon`}
        onClick={this.onSearch}
        type="search"
      />
    );
    return (
      <Input
        onPressEnter={this.onSearch}
        {...others}
        suffix={searchSuffix}
        className={classNames(prefixCls, className)}
        ref={node => this.input = node}
      />
    );
  }
}
