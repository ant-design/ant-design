---
order: 2
title: 小型进度条
---

适合放在较狭窄的区域内。

````jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div style={{ width: 170 }}>
    <Progress percent={30} strokeWidth={5} />
    <Progress percent={50} strokeWidth={5} status="active" />
    <Progress percent={70} strokeWidth={5} status="exception" />
    <Progress percent={100} strokeWidth={5} />
  </div>
, mountNode);
````
