import React, { Component, PropTypes } from 'react';

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
    const {placeholder, value} = this.props;
    return <input placeholder={placeholder} className="ant-input" value={ value } ref="input" onChange={this.handleChange.bind(this)}/>;
  }
}

Search.defaultProps = {
  prefixCls: 'ant-transfer-search',
  placeholder: '请输入搜索内容',
  onChange: noop,
  onDelete: noop,
};

Search.propTypes = {
  prefixCls: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default Search;
