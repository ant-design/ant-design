---
order: 4
title: 箭头指向
---

设置了 `arrowPointAtCenter` 后，箭头将指向目标元素的中心。

````jsx
import { Popover, Button } from 'antd';

const text = <span>标题</span>;
const content = (
  <div>
    <p>内容</p>
    <p>内容</p>
  </div>
);

ReactDOM.render(
  <div>
    <Popover placement="topLeft" title={text} content={content}>
      <Button>默认对齐元素边缘</Button>
    </Popover>
    <Popover placement="topLeft" title={text} content={content} arrowPointAtCenter>
      <Button>箭头指向目标元素的中心</Button>
    </Popover>
  </div>
, mountNode);
````
