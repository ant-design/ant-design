---
order: 1
title: 位置
---

位置有十二个方向。

````jsx
import { Popconfirm, message, Button } from 'antd';

const text = '确定要删除这个任务吗？';

function confirm() {
  message.info('点击了确定');
}

ReactDOM.render(<div>
  <div style={{ marginLeft: 60 }}>
    <Popconfirm placement="topLeft" title={text} onConfirm={confirm}>
      <Button>上左</Button>
    </Popconfirm>
    <Popconfirm placement="top" title={text} onConfirm={confirm}>
      <Button>上边</Button>
    </Popconfirm>
    <Popconfirm placement="topRight" title={text} onConfirm={confirm}>
      <Button>上右</Button>
    </Popconfirm>
  </div>
  <div style={{ width: 60, float: 'left' }}>
    <Popconfirm placement="leftTop" title={text} onConfirm={confirm}>
      <Button>左上</Button>
    </Popconfirm>
    <Popconfirm placement="left" title={text} onConfirm={confirm}>
      <Button>左边</Button>
    </Popconfirm>
    <Popconfirm placement="leftBottom" title={text} onConfirm={confirm}>
      <Button>左下</Button>
    </Popconfirm>
  </div>
  <div style={{ width: 60, marginLeft: 252 }}>
    <Popconfirm placement="rightTop" title={text} onConfirm={confirm}>
      <Button>右上</Button>
    </Popconfirm>
    <Popconfirm placement="right" title={text} onConfirm={confirm}>
      <Button>右边</Button>
    </Popconfirm>
    <Popconfirm placement="rightBottom" title={text} onConfirm={confirm}>
      <Button>右下</Button>
    </Popconfirm>
  </div>
  <div style={{ marginLeft: 60, clear: 'both' }}>
    <Popconfirm placement="bottomLeft" title={text} onConfirm={confirm}>
      <Button>下左</Button>
    </Popconfirm>
    <Popconfirm placement="bottom" title={text} onConfirm={confirm}>
      <Button>下边</Button>
    </Popconfirm>
    <Popconfirm placement="bottomRight" title={text} onConfirm={confirm}>
      <Button>下右</Button>
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
