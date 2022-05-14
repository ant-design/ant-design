---
order: 2
title:
  zh-CN: 自定义尺寸
  en-US: Custom size
---

## zh-CN

自定义尺寸，适应在各种容器中展示。

## en-US

Custom sizes to fit in a variety of containers.

```jsx
import { Descriptions, Radio, Button } from 'antd';

export default () => {
  const [size, setSize] = React.useState('default');

  const onChange = e => {
    console.log('size checked', e.target.value);
    setSize(e.target.value);
  };

  return (
    <div>
      <Radio.Group onChange={onChange} value={size}>
        <Radio value="default">default</Radio>
        <Radio value="middle">middle</Radio>
        <Radio value="small">small</Radio>
      </Radio.Group>
      <br />
      <br />
      <Descriptions
        bordered
        title="Custom Size"
        size={size}
        extra={<Button type="primary">Edit</Button>}
      >
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
        <Descriptions.Item label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1<br />
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <Descriptions title="Custom Size" size={size} extra={<Button type="primary">Edit</Button>}>
        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
        <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
        <Descriptions.Item label="time">18:00:00</Descriptions.Item>
        <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
        <Descriptions.Item label="Official">$60.00</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
```
