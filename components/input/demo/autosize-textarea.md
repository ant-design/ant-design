---
order: 6
title:
    zh-CN: 适应文本高度的文本域
    en-US: Autosizing the height to fit the content
---

## zh-CN

`autosize` 属性适用于 `textarea` 节点，并且只有高度会自动变化。另外 `autosize` 可以设定为一个对象，指定最小行数和最大行数。

## en-US

`autosize` prop for a `textarea` type of `Input` makes the height to automatically adjust based on the content.
An options object can be provided to `autosize` to specify the minimum and maximum number of lines the textarea will automatically adjust.


````jsx
import { Input } from 'antd';

ReactDOM.render(
  <div>
    <Input type="textarea" placeholder="Autosize height based on content lines" autosize />
    <div style={{ margin: '24px 0' }} />
    <Input type="textarea" placeholder="Autosize height with minimum and maximum number of lines" autosize={{ minRows: 2, maxRows: 6 }} />
  </div>
, mountNode);
````
