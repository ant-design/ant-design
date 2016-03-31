---
order: 0
title: 进度条
---

标准的进度条。



````jsx
import { Progress } from 'antd';
const ProgressLine = Progress.Line;

ReactDOM.render(
  <div>
    <ProgressLine percent={30} />
    <ProgressLine percent={50} status="active" />
    <ProgressLine percent={70} status="exception" />
    <ProgressLine percent={100} />
    <ProgressLine percent={50} showInfo={false} />
  </div>
, mountNode);
````
