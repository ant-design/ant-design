---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法，浮层的大小由内容区域决定。

## en-US

The most basic example. The size of the floating layer depends on the contents region.

````jsx
import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

ReactDOM.render(
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
, mountNode);
````

<style>
p {
  margin: 0;
}
</style>
