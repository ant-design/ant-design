import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
import splitObject from '../_util/splitObject';

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
    const [{ className, prefixCls, style }, others] = splitObject(
      this.props, ['className', 'prefixCls', 'style']
    );
    delete others.onSearch;
    const wrapperCls = classNames({
      [`${prefixCls}-wrapper`]: true,
    }, className);
    return (
      <div className={wrapperCls} style={style}>
        <Input
          className={prefixCls}
          onPressEnter={this.onSearch}
          ref={node => this.input = node}
          {...others}
        />
        <Icon
          className={`${prefixCls}-icon`}
          onClick={this.onSearch}
          type="search"
        />
      </div>
    );
  }
}
