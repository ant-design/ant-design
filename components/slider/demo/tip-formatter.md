---
order: 3
title:
  zh-CN: 自定义提示
  en-US: Customerize tooltip
---

## zh-CN

使用 `tipFormatter` 可以格式化 `Tooltip` 的内容，设置 `tipFormatter={null}`，则隐藏 `Tooltip`。

## en-US

Use `tipFormatter` to format content of `Toolip`. If `tipFormatter` is null, hide it.

````__react
import { Slider } from 'antd';

function formatter(value) {
  return `${value}%`;
}

ReactDOM.render(
  <div>
    <Slider tipFormatter={formatter} />
    <Slider tipFormatter={null} />
  </div>,
  mountNode
);
````
