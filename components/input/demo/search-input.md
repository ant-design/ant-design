---
order: 4
title:
    zh-CN: 搜索框
    en-US: Search box
---

## zh-CN

带有搜索按钮的输入框。

## en-US

Example of creating a search box by grouping a standard input with a search button.

````jsx
import { Input, Icon } from 'antd';
import classNames from 'classnames';

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      focus: false,
    };
  }
  handleInputChange = (e) => {
    this.setState({ value: e.target.value });
  }
  handleSearch = () => {
    if (this.state.focus && this.props.onSearch) {
      this.props.onSearch(this.state.value);
    } else {
      this.setState({ focus: true });
    }
  }
  render() {
    const { placeholder } = this.props;
    const wrapperCls = classNames({
      'ant-search-input-wrapper': true,
      'ant-search-input-wrapper-focus': this.state.focus,
    });
    return (
      <div className={wrapperCls}>
        <Input
          className="ant-search-input"
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleInputChange}
          onPressEnter={this.handleSearch}
        />
        <Icon className="ant-search-input-icon" onClick={this.handleSearch} type="search" />
      </div>
    );
  }
}

ReactDOM.render(
  <SearchInput placeholder="input search text" onSearch={value => console.log(value)} />
, mountNode);
````
