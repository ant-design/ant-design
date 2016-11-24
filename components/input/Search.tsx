import React from 'react';
import classNames from 'classnames';
import Input from './Input';
import Icon from '../icon';
import splitObject from '../_util/splitObject';
import omit from 'omit.js';

export interface SearchProps {
  className?: string;
  placeholder?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  defaultValue?: any;
  value?: any;
  onChange?: React.FormEventHandler<any>;
  onSearch?: React.FormEventHandler<any>;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    prefixCls: 'ant-input-search',
  };
  constructor(props) {
    super(props);
    let value;
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    } else {
      value = '';
    }
    this.state = {
      value,
      focus: false,
    };
  }
  onChange = (e) => {
    if (!('value' in this.props)) {
      this.setState({ value: e.target.value });
    }
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(e);
    }
  }
  onSearch = () => {
    if (this.state.focus && this.props.onSearch) {
      this.props.onSearch(this.state.value);
    } else if (!this.state.focus) {
      this.setState({ focus: true });
    }
  }
  render() {
    const [{ className, placeholder, prefixCls }, others] = splitObject(
      this.props, ['className', 'placeholder', 'prefixCls']
    );
    // Fix https://fb.me/react-unknown-prop
    const otherProps = omit(others, [
      'defaultValue',
      'value',
      'onChange',
      'onSearch',
    ]);
    const wrapperCls = classNames({
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-wrapper-focus`]: this.state.focus,
      [className]: !!className,
    });
    return (
      <div className={wrapperCls} {...otherProps}>
        <Input
          className={prefixCls}
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.onChange}
          onPressEnter={this.onSearch}
        />
        <Icon className={`${prefixCls}-icon`} onClick={this.onSearch} type="search" />
      </div>
    );
  }
}
