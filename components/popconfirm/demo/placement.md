---
order: 1
title:
  zh-CN: 位置
  en-US: Placement
---

## zh-CN

位置有十二个方向。如需箭头指向目标元素中心，可以设置 `arrowPointAtCenter`。

## en-US

There are 12 `placement` options available. Use `arrowPointAtCenter` if you want arrow point at the center of target.

````jsx
import { Popconfirm, message, Button } from 'antd';

const text = 'Are you sure delete this task?';

function confirm() {
  message.info('Click on Yes.');
}

ReactDOM.render(<div>
  <div style={{ marginLeft: 60 }}>
    <Popconfirm placement="topLeft" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>TL</Button>
    </Popconfirm>
    <Popconfirm placement="top" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>Top</Button>
    </Popconfirm>
    <Popconfirm placement="topRight" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>TR</Button>
    </Popconfirm>
  </div>
  <div style={{ width: 60, float: 'left' }}>
    <Popconfirm placement="leftTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>LT</Button>
    </Popconfirm>
    <Popconfirm placement="left" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>Left</Button>
    </Popconfirm>
    <Popconfirm placement="leftBottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>LB</Button>
    </Popconfirm>
  </div>
  <div style={{ width: 60, marginLeft: 252 }}>
    <Popconfirm placement="rightTop" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>RT</Button>
    </Popconfirm>
    <Popconfirm placement="right" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>Right</Button>
    </Popconfirm>
    <Popconfirm placement="rightBottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>RB</Button>
    </Popconfirm>
  </div>
  <div style={{ marginLeft: 60, clear: 'both' }}>
    <Popconfirm placement="bottomLeft" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>BL</Button>
    </Popconfirm>
    <Popconfirm placement="bottom" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>Bottom</Button>
    </Popconfirm>
    <Popconfirm placement="bottomRight" title={text} onConfirm={confirm} okText="Yes" cancelText="No">
      <Button>BR</Button>
    </Popconfirm>
  </div>
</div>, mountNode);
````

<style>
.code-box-demo .ant-popover-wrap > a {
  margin-right: 1em;
}
.code-box-demo .ant-btn {
  margin-right: 1em;
  margin-bottom: 1em;
}
</style>
