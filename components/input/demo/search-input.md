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
  <Search
    placeholder="input search text"
    style={{ width: 200 }}
    onSearch={value => console.log(value)}
  />
, mountNode);
````
