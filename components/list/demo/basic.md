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

const listData1 = [];
for (let i = 0; i < 10; i++) {
  listData1.push({
    href: '#xxx',
    title: `蚂蚁金服设计平台简介 ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: '一段假象的简介,这是一段比较长的简介,还有很多',
    content: '段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
  });
}

const pagination = {
  pageSize: 10,
  current: 1,
  total: listData1.length,
  onChange: (() => {}),
};

ReactDOM.render(
  <div>
    <List bordered="dashed" pagination={pagination}>
      {
        listData1.map(item => (
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
  </div>
, mountNode);
````
