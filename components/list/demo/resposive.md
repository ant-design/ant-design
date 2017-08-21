---
order: 0
title:
  zh-CN: 响应式的栅格列表 
  en-US: Grid
---

## zh-CN

响应式的栅格列表。

## en-US

Responsive Grid List.

````jsx
import { List, Card } from 'antd';

ReactDOM.render(
  <List
    grid={{ gutter: 16, xs: 2, sm: 2, md: 4, lg: 4, xl: 6 }}
  >
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
    <List.Item>
      <Card title="Card title">Card content</Card>
    </List.Item>
  </List>
, mountNode);
````
