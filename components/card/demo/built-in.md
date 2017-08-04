---
order: 8
title:
  zh-CN: 内建模式
  en-US: Built-in Mode
---

## zh-CN

当 Card 组件不包含任何子元素时，自动变为内建模式，标题 `title` 移到封面 `cover` 下方，并支持 `avatar` `description` `extraContent` 属性配置。

## en-US

When the Card component does not contain any child elements, it automatically turns into the built-in mode, in which the `title` shows below the `cover`, and props `avatar` `description` `extraContent` are availabel.

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
