---
order: 11
title:
  zh-CN: 带移除图标
  en-US: With clear icon
---

## zh-CN

带移除图标的输入框，点击图标删除所有内容。

## en-US

Input box with the remove icon, click the icon to delete everything.

```jsx
import { Input } from 'antd';

const { TextArea } = Input;

const onChange = e => {
  console.log(e);
};

ReactDOM.render(
  <div>
    <Input placeholder="input with clear icon" allowClear onChange={onChange} />
    <br />
    <br />
    <TextArea placeholder="textarea with clear icon" allowClear onChange={onChange} />
  </div>,
  mountNode,
);
```
