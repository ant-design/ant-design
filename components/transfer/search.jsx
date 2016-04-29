import React, { PropTypes } from 'react';
import Icon from '../icon';
function noop() {
}

export default class Search extends React.Component {
  static defaultProps = {
    placeholder: '',
    onChange: noop,
    handleClear: noop,
  }

  static propTypes = {
    prefixCls: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    handleClear: PropTypes.func,
  }

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
          onChange={this.handleChange} />
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
