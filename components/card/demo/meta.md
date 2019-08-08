---
order: 9
title:
  zh-CN: 支持更多内容配置
  en-US: Support more content configuration
---

## zh-CN

一种支持封面、头像、标题和描述信息的卡片。

## en-US

A Card that supports `cover`, `avatar`, `title` and `description`.

```jsx
import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

ReactDOM.render(
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[
      <Icon type="setting" key="setting" />,
      <Icon type="edit" key="edit" />,
      <Icon type="ellipsis" key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
      title="Card title"
      description="This is the description"
    />
  </Card>,
  mountNode,
);
```
