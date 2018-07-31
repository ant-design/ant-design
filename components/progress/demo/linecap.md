---
order: 10
title:
  zh-CN:
  en-US: Square linecaps
---

## zh-CN

`strokeLinecap="square"`

## en-US

By setting `strokeLinecap="square`, you can change the linecaps from round to square.

````jsx
import { Progress } from 'antd';

ReactDOM.render(
  <div>
    <Progress strokeLinecap="square" percent={75} />
    <Progress strokeLinecap="square" type="circle" percent={75} />
    <Progress strokeLinecap="square" type="dashboard" percent={75} />
  </div>,
  mountNode);
````
