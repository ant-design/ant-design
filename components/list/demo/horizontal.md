---
order: 0
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

const listData1 = [];
for (let i = 0; i < 10; i++) {
  listData1.push({
    href: '#xxx',
    title: `蚂蚁金服设计平台简介 ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '一段假象的简介,这是一段比较长的简介,还有很多',
    content: '没什么实际内容',
  });
}

ReactDOM.render(
  <div>
    <List
      itemLayout="horizontal"
      showLoadMore
      onLoadMore={() => {}}
    >
      {
        listData1.map(item => (
          <List.Item key={item.title} >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            <List.Item.Content>
              {item.content}
            </List.Item.Content>
            <List.Item.Action>
              <a>编辑</a> | <a>更多</a>
            </List.Item.Action>
          </List.Item>
        ))
      }
    </List>
  </div>
, mountNode);
````
