---
order: 2
title:
  zh-CN: 三种触发方式
  en-US: Three ways to trigger
---

## zh-CN

鼠标移入、聚集、点击。

## en-US

Mouse to click, focus and move in.

````jsx
import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>内容</p>
    <p>内容</p>
  </div>
);

ReactDOM.render(
  <div>
    <Popover content={content} title="标题" trigger="hover">
      <Button>移入</Button>
    </Popover>
    <Popover content={content} title="标题" trigger="focus">
      <Button>聚焦</Button>
    </Popover>
    <Popover content={content} title="标题" trigger="click">
      <Button>点击</Button>
    </Popover>
  </div>
, mountNode);
````
