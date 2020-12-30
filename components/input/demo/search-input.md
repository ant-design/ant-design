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

```jsx
import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);

const onSearch = value => console.log(value);

ReactDOM.render(
  <>
    <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
    <Search
      placeholder="input search text"
      allowClear
      onSearch={onSearch}
      style={{ width: 200, margin: '0 10px' }}
    />
    <br />
    <br />
    <Search placeholder="input search text" onSearch={onSearch} enterButton />
    <br />
    <br />
    <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />
    <br />
    <br />
    <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={onSearch}
    />
  </>,
  mountNode,
);
```
