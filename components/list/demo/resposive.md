---
order: 5
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

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
];

ReactDOM.render(
  <List
    grid={{ gutter: 16, xs: 2, sm: 2, md: 4, lg: 4, xl: 6 }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
, mountNode);
````
