---
order: 6
title:
  zh-CN: 圆角箭头
  en-US: Round Arrow
---

## zh-CN

使用 `roundedArrow` 来启用圆角箭头样式。

## en-US

Use `roundedArrow` to enable round arrow.

```jsx
import { Tooltip, Button } from 'antd';

const text = <span>prompt text</span>;

const buttonWidth = 70;

ReactDOM.render(
  <div className="demo">
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
      <Tooltip placement="top" title={text} roundedArrow>
        <Button>Top</Button>
      </Tooltip>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Tooltip placement="left" title={text} roundedArrow>
        <Button>Left</Button>
      </Tooltip>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 2 }}>
      <Tooltip placement="right" title={text} roundedArrow>
        <Button>Right</Button>
      </Tooltip>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
      <Tooltip placement="bottom" title={text} roundedArrow>
        <Button>Bottom</Button>
      </Tooltip>
    </div>
  </div>,
  mountNode,
);
```

<style>
.code-box-demo .demo {
  overflow: auto;
}
.code-box-demo .ant-btn {
  margin-right: 8px;
  margin-bottom: 8px;
}
.code-box-demo .ant-btn-rtl {
  margin-right: 0;
  margin-left: 8px;
  margin-bottom: 8px;
}
#components-tooltip-demo-rounded-arrow .ant-btn {
  width: 70px;
  text-align: center;
  padding: 0;
}
</style>
