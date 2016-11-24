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
import { Input } from 'antd';
const InputSearch = Input.Search;

ReactDOM.render(
  <InputSearch placeholder="input search text" onSearch={value => console.log(value)} />
, mountNode);
````
