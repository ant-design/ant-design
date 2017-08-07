---
order: 8
title:
  zh-CN: 内建模式
  en-US: Built-in Mode
---

## zh-CN

支持封面、头像、标题、描述信息和额外信息的卡片。

## en-US

A Card that supports `cover`, `avatar`, `title`, `description` and `extraContent`.

````jsx
import { Card, Icon, Avatar } from 'antd';

ReactDOM.render(
  <Card
    style={{ width: 300 }}
    title="Card title"
    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
    description="This is the description"
    extraContent="Updated 5 hours ago"
  />
, mountNode);
````
