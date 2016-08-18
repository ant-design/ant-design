---
order: 0
title: 基本
---

简单的标签展示，添加 closable 表示可关闭。

````jsx
import { Tag } from 'antd';

function onClose(e) {
  console.log(e);
}

ReactDOM.render(<div>
  <Tag>标签一</Tag>
  <Tag>标签二</Tag>
  <Tag closable onClose={onClose}>标签三</Tag>
</div>, mountNode);
````
