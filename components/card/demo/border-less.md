---
order: 1
title: 无边框
---

在灰色背景上使用无边框的卡片。

````jsx
import { Card } from 'antd';

ReactDOM.render(
  <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="卡片标题" bordered={false} style={{ width: 300 }}>
      <p>卡片的内容</p>
      <p>卡片的内容</p>
      <p>卡片的内容</p>
    </Card>
  </div>
, mountNode);
````
