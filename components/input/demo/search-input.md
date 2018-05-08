---
order: 4
title:
    zh-CN: 搜索框
    en-US: Search box
---

## zh-CN

带有搜索按钮的输入框，`2.5.0` 时新增。

## en-US

Example of creating a search box by grouping a standard input with a search button, added in `2.5.0`.

````jsx
import { Input } from 'antd';
const Search = Input.Search;

ReactDOM.render(
  <div>
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      style={{ width: 200 }}
    />
    <br /><br />
    <Search
      placeholder="input search text"
      onSearch={value => console.log(value)}
      enterButton
    />
    <br /><br />
    <Search placeholder="input search text" enterButton="Search" size="large" />
  </div>
, mountNode);
````
