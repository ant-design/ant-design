---
order: 3
title:
  zh-CN: 响应式
  en-US: responsive
---

## zh-CN

通过响应式的配置可以实现在小屏幕设备上的完美呈现。

## en-US

Responsive configuration enables perfect presentation on small screen devices.

```jsx
import { Descriptions } from 'antd';

const DescriptionsItem = Descriptions.Item;

const Demo = () => {
  return (
    <div>
      <Descriptions
        title="Responsive Descriptions"
        border
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <DescriptionsItem label="Product">Cloud Database</DescriptionsItem>
        <DescriptionsItem label="Billing">Prepaid</DescriptionsItem>
        <DescriptionsItem label="time">18:00:00</DescriptionsItem>
        <DescriptionsItem label="Amount">$80.00</DescriptionsItem>
        <DescriptionsItem label="Discount">$20.00</DescriptionsItem>
        <DescriptionsItem label="Official">$60.00</DescriptionsItem>
        <DescriptionsItem label="Config Info">
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication_factor:3
          <br />
          Region: East China 1
        </DescriptionsItem>
      </Descriptions>
    </div>
  );
};

ReactDOM.render(<Demo />, mountNode);
```
