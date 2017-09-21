---
order: 2
title:
  zh-CN: 基础列表 
  en-US: Basic
---

## zh-CN

基础列表。

## en-US

Basic List.

````jsx
import { List, Avatar } from 'antd';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

ReactDOM.render(
  <List
    itemLayout="horizontal"
    showLoadMore
    onLoadMore={() => {}}
    dataSource={data}
    renderItem={item => (
      <List.Item actions={[<a>编辑</a>, <a>更多</a>]}>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
        <div style={{ padding: 24 }}>Content</div>
      </List.Item>
    )}
  />
, mountNode);
````
