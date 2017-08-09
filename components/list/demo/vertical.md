---
order: 1
title:
  zh-CN: 竖排列表样式
  en-US: Layout Vertical 
---

## zh-CN

基础列表。

## en-US

Basic List.

````jsx
import { List, Avatar } from 'antd';

const listData = [];
for (let i = 0; i < 10; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData.length,
  onChange: (() => {}),
};

ReactDOM.render(
  <List itemLayout="vertical" pagination={pagination}>
    {
      listData.map(item => (
        <List.Item
          key={item.title}
          extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          <List.Item.Content>
            {item.content}
          </List.Item.Content>
          <List.Item.Action
            actions={[
              {
                icon: 'star-o',
                text: 156,
              },
              {
                icon: 'like-o',
                text: 156,
              },
              {
                icon: 'message',
                text: 2,
              },
            ]}
          />
        </List.Item>
      ))
    }
  </List>
, mountNode);
````
