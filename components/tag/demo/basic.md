---
order: 0
title: 
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

简单的标签展示，添加 closable 表示可关闭。

## en-US

Simple demo of tag, 'closable' property represents which can be closed.

````jsx
import { Tag } from 'antd';

function onClose(e) {
  console.log(e);
}

ReactDOM.render(<div>
  <Tag>Tag 1</Tag>
  <Tag>Tag 2</Tag>
  <Tag closable onClose={onClose}>Tag 3</Tag>
</div>, mountNode);
````
