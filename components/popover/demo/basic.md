---
order: 0
title: 基本
---

最简单的用法，浮层的大小由内容区域决定。

````jsx
import { Popover, Button } from 'antd';

const content = (
  <div>
    <p>内容</p>
    <p>内容</p>
  </div>
);

ReactDOM.render(
  <Popover content={content} title="标题">
    <Button type="primary">弹出卡片</Button>
  </Popover>
, mountNode);
````
