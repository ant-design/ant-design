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
  <div>
    <Search placeholder="input search loading deault" loading />
    <br />
    <br />
    <Search placeholder="input search loading with enterButton" loading enterButton />
  </div>,
  mountNode,
);
```
