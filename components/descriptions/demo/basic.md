---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的展示。

## en-US

Simplest Usage.

```jsx
import { Descriptions } from 'antd';

const DescriptionsItem = Descriptions.Item;

ReactDOM.render(
  <Descriptions title="User Info">
    <DescriptionsItem label="UserName">Zhou Maomao</DescriptionsItem>
    <DescriptionsItem label="Telephone">1810000000</DescriptionsItem>
    <DescriptionsItem label="Live">Hangzhou, Zhejiang</DescriptionsItem>
    <DescriptionsItem label="Remark">empty</DescriptionsItem>
    <DescriptionsItem label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </DescriptionsItem>
  </Descriptions>,
  mountNode,
);
```
