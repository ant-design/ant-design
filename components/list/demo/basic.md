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

ReactDOM.render(
  <List
    itemLayout="horizontal"
    showLoadMore
    onLoadMore={() => {}}
  >
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
      <List.Item.Content>
        Content
      </List.Item.Content>
      <List.Item.Action>
        <a>edit</a> | <a>more</a>
      </List.Item.Action>
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
      <List.Item.Content>
        Content
      </List.Item.Content>
      <List.Item.Action>
        <a>edit</a> | <a>more</a>
      </List.Item.Action>
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
      <List.Item.Content>
        Content
      </List.Item.Content>
      <List.Item.Action>
        <a>edit</a> | <a>more</a>
      </List.Item.Action>
    </List.Item>
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={<a href="https://ant.design">Ant design</a>}
        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
      />
      <List.Item.Content>
        Content
      </List.Item.Content>
      <List.Item.Action>
        <a>edit</a> | <a>more</a>
      </List.Item.Action>
    </List.Item>
  </List>
, mountNode);
````
