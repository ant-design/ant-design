---
order: 11
title:
    zh-CN: 带移除图标
    en-US: With clear icon
---

## zh-CN

带移除图标的输入框，点击图标删除所有内容。

## en-US

Input type of password.

````jsx
import { Input } from 'antd';

const onChange = (e) => {
  console.log(e);
};

ReactDOM.render(
  <Input placeholder="input with clear icon" allowClear onChange={onChange} />
, mountNode);
````
