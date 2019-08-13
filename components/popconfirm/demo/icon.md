---
order: 4
title:
  zh-CN: 自定义 Icon 图标
  en-US: Customize icon
---

## zh-CN

自定义提示 `icon`。

## en-US

Set `icon` props to customize the icon.

```jsx
import { Popconfirm } from 'antd';
import { QuestionCircle } from '@ant-design/icons';

ReactDOM.render(
  <Popconfirm title="Are you sure？" icon={<QuestionCircle style={{ color: 'red' }} />}>
    <a href="#">Delete</a>
  </Popconfirm>,
  mountNode,
);
```
