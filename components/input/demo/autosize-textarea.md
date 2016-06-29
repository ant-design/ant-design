---
order: 6
title: 适应文本高度的文本域
---

`autosize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autosize` 可以设定为一个对象，指定最小行数和最大行数。

````jsx
import { Input } from 'antd';

ReactDOM.render(
  <div>
    <Input type="textarea" placeholder="自适应内容高度" autosize />
    <div style={{ margin: '24px 0' }} />
    <Input type="textarea" placeholder="有最大高度和最小高度" autosize={{ minRows: 2, maxRows: 6 }} />
  </div>
, mountNode);
````
