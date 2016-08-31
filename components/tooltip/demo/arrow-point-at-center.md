---
order: 2
title: 箭头指向
---

设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

````jsx
import { Tooltip, Button } from 'antd';

ReactDOM.render(
  <div>
    <Tooltip placement="topLeft" title="提示文字 提示文字">
      <Button>默认对齐元素边缘</Button>
    </Tooltip>
    <Tooltip placement="topLeft" title="提示文字 提示文字" arrowPointAtCenter>
      <Button>箭头指向目标元素的中心</Button>
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
