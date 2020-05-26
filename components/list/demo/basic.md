---
order: 1
title:
  zh-CN: 基础列表
  en-US: Basic list
---

## zh-CN

基础列表。

## en-US

Basic list.

```jsx
import { List, Avatar } from '@allenai/varnish';

const data = [
  {
    title: 'Varnish Title 1',
  },
  {
    title: 'Varnish Title 2',
  },
  {
    title: 'Varnish Title 3',
  },
  {
    title: 'Varnish Title 4',
  },
];

ReactDOM.render(
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://varnish.allenai.org/">{item.title}</a>}
          description="Varnish, a design language for background applications, is refined by AI2"
        />
      </List.Item>
    )}
  />,
  mountNode,
);
```
