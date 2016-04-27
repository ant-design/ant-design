---
order: 5
title: 预加载的卡片
---

数据读入前会有文本块样式。

````jsx
import { Card } from 'antd';

ReactDOM.render(
  <Card loading title="卡片标题" style={{ width: '34%' }}>
    Whatever content
  </Card>
, mountNode);
````
