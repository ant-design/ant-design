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
import { DescriptionList } from 'antd';

const DescriptionListItem = DescriptionList.Item;

ReactDOM.render(
  <DescriptionList title="User Info">
    <DescriptionListItem label="UserName">Zhou Maomao</DescriptionListItem>
    <DescriptionListItem label="Telephone">1810000000</DescriptionListItem>
    <DescriptionListItem label="Live">Hangzhou, Zhejiang</DescriptionListItem>
    <DescriptionListItem label="Remark">empty</DescriptionListItem>
    <DescriptionListItem label="Address">
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </DescriptionListItem>
  </DescriptionList>,
  mountNode
);
```
