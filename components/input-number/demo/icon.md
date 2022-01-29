---
order: 1
title:
  zh-CN: 图标按钮
  en-US: Icon
---

## zh-CN

当需要使用自定义`Icon`时，可以设置  `Icon` 组件为 `upIcon` 和 `downIcon` 的属性值

## en-US

When you need to use a custom `Icon`, you can set the `Icon` component as the property value of `upIcon` and `downIcon`

```jsx
import { InputNumber } from 'antd';
import { ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';
function onChange(value) {
  console.log('changed', value);
}

ReactDOM.render(<InputNumber min={1} max={10} upIcon={<ArrowUpOutlined />} downIcon={<ArrowDownOutlined/>} defaultValue={3} onChange={onChange} />, mountNode);
```
