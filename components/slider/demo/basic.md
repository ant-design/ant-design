---
order: 0
title: 
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

基本滑动条。当 `range` 为 `true` 时，渲染为双滑块。当 `disabled` 为 `true` 时，滑块处于不可用状态。

## en-US

Basic slider. When `range` is `true`, display as dual thumb mode. When `disable` is `true`, the slider will not be interactable.

````jsx
import { Slider } from 'antd';

ReactDOM.render(<div>
  <Slider defaultValue={30} />
  <Slider range defaultValue={[20, 50]} />
  <Slider range defaultValue={[20, 50]} disabled />
</div>
, mountNode);
````

<style>
.code-box-demo .ant-slider {
  margin-bottom: 50px;
}
.code-box-demo .ant-slider:last-child {
  margin-bottom: 10px;
}
</style>
