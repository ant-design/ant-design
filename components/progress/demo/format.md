---
order: 6
title: 自定义文字格式
---

`format` 属性指定格式。

````jsx
import { Progress } from 'antd';
const ProgressCircle = Progress.Circle;

ReactDOM.render(
  <div>
    <ProgressCircle percent={75} format={percent => `${percent / 10.0}折` } />
    <ProgressCircle percent={100} format={() => '成功'} />
  </div>
  , mountNode);
````

<style>
.ant-progress-circle-wrap,
.ant-progress-line-wrap {
  margin-right: 8px;
  margin-bottom: 5px;
}
</style>
