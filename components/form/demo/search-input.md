---
order: 10
title: 搜索框
---

带有搜索按钮。

````jsx
import { Icon, Input, Button } from 'antd';
import classNames from 'classnames';
const InputGroup = Input.Group;

const SearchInput = React.createClass({
  getInitialState() {
    return {
      value: '',
      focus: false,
    };
  },
  handleInputChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  handleFocusBlur(e) {
    this.setState({
      focus: e.target === document.activeElement,
    });
  },
  handleSearch() {
    if (this.props.onSearch) {
      this.props.onSearch(this.state.value);
    }
  },
  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });
    return (
      <InputGroup className={searchCls} style={this.props.style}>
        <Input {...this.props} value={this.state.value} onChange={this.handleInputChange}
          onFocus={this.handleFocusBlur} onBlur={this.handleFocusBlur} onPressEnter={this.handleSearch} />
        <div className="ant-input-group-wrap">
          <Button className={btnCls} size={this.props.size} onClick={this.handleSearch}>
            <Icon type="search" />
          </Button>
        </div>
      </InputGroup>
    );
  }
});

ReactDOM.render(
  <SearchInput placeholder="input search text"
    onSearch={(value) => console.log(value)} style={{ width: 200 }} />
, mountNode);
````
