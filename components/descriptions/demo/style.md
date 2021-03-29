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
import { Descriptions, Divider, Space, Radio } from 'antd';

const labelStyle: React.CSSProperties = { background: 'red' };
const contentStyle: React.CSSProperties = { background: 'green' };

const Demo = () => {
  const [border, setBorder] = React.useState(false);
  const [layout, setLayout] = React.useState('horizontal');

  return (
    <>
      <Radio.Group onChange={e => setBorder(e.target.value)} value={border}>
        <Radio value={true}>border</Radio>
        <Radio value={false}>no border</Radio>
      </Radio.Group>
      <Divider />
      <Radio.Group onChange={e => setLayout(e.target.value)} value={layout}>
        <Radio value={'horizontal'}>horizontal</Radio>
        <Radio value={'vertical'}>vertical</Radio>
      </Radio.Group>
      <Divider />
      <Descriptions title="User Info" bordered={border} layout={layout}>
        <Descriptions.Item label="Product" labelStyle={labelStyle} contentStyle={contentStyle}>
          Cloud Database
        </Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions
        title="Root style"
        labelStyle={labelStyle}
        contentStyle={contentStyle}
        bordered={border}
        layout={layout}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
        <Descriptions.Item
          label="Automatic Renewal"
          labelStyle={{ color: 'orange' }}
          contentStyle={{ color: 'blue' }}
        >
          YES
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
