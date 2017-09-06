---
order: 1
title:
  zh-CN: 带有头像和描述的列表
  en-US: List with avatar and description.
---

## zh-CN

带有头像和描述的列表。

## en-US

List with avatar and description.

````jsx
import { List, Avatar } from 'antd';

ReactDOM.render(
  <List
    itemLayout="horizontal"
  >
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
    </List.Item>
  </List>
, mountNode);
````
