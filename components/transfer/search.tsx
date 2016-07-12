import * as React from 'react';
import Icon from '../icon';
function noop() {
}

export interface SearchProps {
  prefixCls?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent) => void;
  handleClear?: (e: React.MouseEvent) => void;
  value?: any;
}

export default class Search extends React.Component<SearchProps, any> {
  static defaultProps = {
    placeholder: '',
    onChange: noop,
    handleClear: noop,
  };

  handleChange = (e) => {
    this.props.onChange(e);
  }

  handleClear = (e) => {
    e.preventDefault();
    this.props.handleClear(e);
  }

  render() {
    const { placeholder, value, prefixCls } = this.props;
    return (
      <div>
        <input placeholder={placeholder} className={`${prefixCls} ant-input`} value={value} ref="input"
          onChange={this.handleChange}
        />
        {value && value.length > 0 ?
          <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
            <Icon type="cross-circle" />
          </a>
          : <span className={`${prefixCls}-action`}><Icon type="search" /></span>
        }
      </div>
    );
  }
}
