---
order: 0
title: 典型卡片
---

包含标题、内容、操作区域。

````jsx
import { Card } from 'antd';

ReactDOM.render(
  <Card title="卡片标题" extra={<a href="#">更多</a>} style={{ width: 300 }}>
    <p>卡片的内容</p>
    <p>卡片的内容</p>
    <p>卡片的内容</p>
  </Card>
, mountNode);
````
