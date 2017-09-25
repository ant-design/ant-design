---
order: 4
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
    grid={{ gutter: 16, column: 4 }}
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <Card title={item.title}>Card content</Card>
      </List.Item>
    )}
  />
, mountNode);
````
