---
order: 4
title:
  zh-CN: 搜索框
  en-US: Search box
---

## zh-CN

带有搜索按钮的输入框，`2.5.0` 时新增，3.14.0 后支持 `loading` 态。

## en-US

Example of creating a search box by grouping a standard input with a search button, added in `2.5.0` and `loading` property is supported in `3.14.0`.

````jsx
import { Input } from 'antd';

const Search = Input.Search;

class SearchDemo extends React.Component {
  state = {
    loading1: false,
    loading2: false,
    loading3: false,
  };

  handleSearch = (key, value) => {
    console.log(value);
    this.setState({
      [key]: true,
    });
    setTimeout(() => {
      this.setState({
        [key]: false,
      });
    }, 3000);
  }

  render () {
    const { loading1, loading2, loading3 } = this.state;
    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => this.handleSearch('loading1', value)}
          style={{ width: 200 }}
          loading={loading1}
        />
        <br /><br />
        <Search
          placeholder="input search text"
          onSearch={value => this.handleSearch('loading2', value)}
          enterButton
          loading={loading2}
        />
        <br /><br />
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={value => this.handleSearch('loading3', value)}
          loading={loading3}
        />
      </div>
    );
  }
}

ReactDOM.render( <SearchDemo />, mountNode);
````
