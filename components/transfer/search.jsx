import React, { Component, PropTypes } from 'react';
import Icon from '../icon';
function noop() {
}

class Search extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  render() {
    const {placeholder, value, prefixCls} = this.props;
    return <div>
      <input placeholder={placeholder} className={ prefixCls + ' ant-input' } value={ value } ref="input"
             onChange={this.handleChange.bind(this)}/>
      { value && value.length > 0 ?
        <a href="javascirpt:;" className={ prefixCls + '-action' } onClick={this.props.handleClear}>
          <Icon type="cross-circle" />
        </a>
        : <span className={ prefixCls + '-action' }><Icon type="search" /></span>
      }
    </div>;
  }
}

Search.defaultProps = {
  placeholder: '请输入搜索内容',
  onChange: noop,
};

Search.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
