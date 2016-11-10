---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

基本标签的用法，可以通过添加 `closable` 变为可关闭标签。可关闭标签具有 `onClose` `afterClose` 两个事件。

## en-US

Usage of basic Tag, and it could be closable by set `closable` property. Closable Tag supports `onClose` `afterClose` events.

````jsx
import { Tag } from 'antd';

function log(e) {
  console.log(e);
}

ReactDOM.render(
  <div>
    <Tag>Tag 1</Tag>
    <Tag closable onClose={log}>Tag 2</Tag>
    <Tag closable afterClose={log}>Tag 3</Tag>
    <Tag closable><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
  </div>,
  mountNode
);
````
