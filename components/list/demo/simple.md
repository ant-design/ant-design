---
order: 0
title:
  zh-CN: 列表尺寸
  en-US: Simple
---

## zh-CN

最简单的列表，拥有大、中、小三种尺寸。

通过设置 `size` 为 `large` `smal`l 分别把按钮设为大、小尺寸。若不设置 `size`，则尺寸为中。

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
  <div>
    <h3 style={{ margin: '16px 0' }}>Small Size</h3>
    <List
      bordered
      dataSource={data}
      size="small"
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
    <h3 style={{ margin: '16px 0' }}>Default Size</h3>
    <List
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
    <h3 style={{ margin: '16px 0' }}>Large Size</h3>
    <List
      bordered
      dataSource={data}
      size="large"
      renderItem={item => (<List.Item>{item}</List.Item>)}
    />
  </div>
, mountNode);
````
