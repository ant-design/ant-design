---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

带边框和背景颜色列表，更加易读

## en-US

More easy to read with a border and background color list

```jsx
import { DescriptionList } from 'antd';

const DescriptionListItem = DescriptionList.Item;

ReactDOM.render(
  <DescriptionList title="User Info" border>
    <DescriptionListItem label="Product">Cloud Database</DescriptionListItem>
    <DescriptionListItem label="Billing Mode">Prepaid</DescriptionListItem>
    <DescriptionListItem label="Automatic Renewal">YES</DescriptionListItem>
    <DescriptionListItem label="Order time">
      2018-04-24 18:00:00
    </DescriptionListItem>
    <DescriptionListItem label="Usage Time" span={3}>
      2018-04-24 18:00:00 To 2019-04-24 18:00:00
    </DescriptionListItem>
    <DescriptionListItem label="Status" span={3}>
      Running
    </DescriptionListItem>
    <DescriptionListItem label="Negotiated Amount">$80.00</DescriptionListItem>
    <DescriptionListItem label="Discount">$20.00</DescriptionListItem>
    <DescriptionListItem label="Official Receipts">$60.00</DescriptionListItem>
    <DescriptionListItem label="Config Info">
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
      Region: East China 1<br />
    </DescriptionListItem>
  </DescriptionList>,
  mountNode
);

```
