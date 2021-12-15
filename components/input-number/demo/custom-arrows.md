---
order: 2
title:
  zh-CN: 自定义向上/向下箭头
  en-US: Custom up / down arrows
---

## zh-CN

使用上下自定义箭头示例。

## en-US

Using up & down custom arrows example.

```jsx
import { InputNumber, Space } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

ReactDOM.render(
  <Space direction="vertical">
    <InputNumber customUpIcon={<SettingOutlined />} customDownIcon="$" defaultValue={100} />
  </Space>,
  mountNode,
);
```
