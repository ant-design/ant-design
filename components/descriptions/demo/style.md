---
order: 999
title:
  zh-CN: 自定义 label & wrapper 样式
  en-US: Customize label & wrapper style
debug: true
---

## zh-CN

自定义 label & wrapper 样式

## en-US

Customize label & wrapper style

```tsx
import { Descriptions } from 'antd';

const labelStyle: React.CSSProperties = { background: 'red' };
const contentStyle: React.CSSProperties = { background: 'green' };

ReactDOM.render(
  <>
    <Descriptions title="User Info">
      <Descriptions.Item label="Product" labelStyle={labelStyle} contentStyle={contentStyle}>
        Cloud Database
      </Descriptions.Item>
      <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    </Descriptions>

    <Descriptions title="User Info" bordered>
      <Descriptions.Item label="Product" labelStyle={labelStyle} contentStyle={contentStyle}>
        Cloud Database
      </Descriptions.Item>
      <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
      <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
    </Descriptions>
  </>,
  mountNode,
);
```
