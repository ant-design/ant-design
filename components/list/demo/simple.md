---
order: 0
title:
  zh-CN: 简单列表
  en-US: Simple
---

## zh-CN

最简单的列表。

## en-US

Simple List.

````jsx
import { List } from 'antd';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

ReactDOM.render(
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (<List.Item>{item}</List.Item>)}
  />
, mountNode);
````
