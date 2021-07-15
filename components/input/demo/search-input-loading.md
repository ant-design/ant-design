---
order: 5
title:
  zh-CN: 搜索框 loading
  en-US: Search box with loading
---

## zh-CN

用于 `onSearch` 的时候展示 `loading`。

## en-US

Search loading when onSearch.

```jsx
import { Input } from 'antd';

const { Search } = Input;

ReactDOM.render(
  <>
    <Search placeholder="input search loading default" loading />
    <br />
    <br />
    <Search placeholder="input search loading with enterButton" loading enterButton />
    <br />
    <br />
    <Search placeholder="input search text" enterButton="Search" size="large" loading />
  </>,
  mountNode,
);
```
