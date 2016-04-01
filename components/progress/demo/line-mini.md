---
order: 2
title: 小型进度条
---

适合放在较狭窄的区域内。

````jsx
import { Progress } from 'antd';
const ProgressLine = Progress.Line;

ReactDOM.render(
  <div style={{ width: 170 }}>
    <ProgressLine percent={30} strokeWidth={5} />
    <ProgressLine percent={50} strokeWidth={5} status="active" />
    <ProgressLine percent={70} strokeWidth={5} status="exception" />
    <ProgressLine percent={100} strokeWidth={5} />
  </div>
, mountNode);
````
