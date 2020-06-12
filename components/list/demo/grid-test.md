---
order: 4.1
title:
  zh-CN: 测试栅格列表
  en-US: Test Grid
debug: true
---

## zh-CN

List `grid` 在各种情况下的样式表现，如 Fragment 和封装了 List.Item.

## en-US

Test List `grid` for some edge cases.

```jsx
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
  {
    title: 'Title 5',
  },
    {
    title: 'Title 6',
  },
];

const ListItem = () => (
  <List.Item>
    <Card title="title">Card content</Card>
  </List.Item>
);

ReactDOM.render(
  <>
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={item => (
        <>
          <List.Item>
            <Card title={item.title}>Card content</Card>
          </List.Item>
        </>
      )}
    />
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={() => <ListItem />}
    />
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={data}
      renderItem={() => (
        <>
          <ListItem />
          <div />
        </>
      )}
    />
  </>,
  mountNode,
);
```
