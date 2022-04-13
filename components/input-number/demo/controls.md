---
order: 99
debug: true
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

可以扩展 `controls` 属性用以设置自定义图标。

## en-US

When you need to use a custom `Icon`, you can set the `Icon` component as the property value of `upIcon` and `downIcon`.

```jsx
import { InputNumber } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

export default () => (
  <InputNumber controls={{ upIcon: <ArrowUpOutlined />, downIcon: <ArrowDownOutlined /> }} />
);
```
