---
order: 2
title:
  zh-CN: 箭头指向
  en-US: Arrow pointing at the center
---

## zh-CN

设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

## en-US

By specifying `arrowPointAtCenter` prop, the arrow will point to the center of the target element.

````jsx
import { Tooltip, Button } from 'antd';

ReactDOM.render(
  <div>
    <Tooltip placement="topLeft" title="Prompt Text">
      <Button>Tooltip default pointing alignment</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="Prompt Text" arrowPointAtCenter>
      <Button>Tooltip central alignment</Button>
    </Tooltip>
  </div>
, mountNode);
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
