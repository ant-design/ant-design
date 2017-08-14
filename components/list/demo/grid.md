---
order: 0
title:
  zh-CN: 栅格列表 
  en-US: Grid
---

## zh-CN

栅格列表。

## en-US

Grid List.

````jsx
import { List, Card } from 'antd';

ReactDOM.render(
  <List
    grid={{ gutter: 16, column: 4 }}
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
