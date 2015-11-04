# 位置

- order: 1

位置有四个方向。

---

````jsx
import { Popconfirm, message, Button } from 'antd';

const text = '确定要删除这个任务吗？';

function confirm() {
  message.info('点击了确定');
}

ReactDOM.render(<div>
  <Popconfirm placement="leftTop" title={text} onConfirm={confirm}>
    <Button>左上</Button>
  </Popconfirm>
  <Popconfirm placement="left" title={text} onConfirm={confirm}>
    <Button>左</Button>
  </Popconfirm>
  <Popconfirm placement="leftBottom" title={text} onConfirm={confirm}>
    <Button>左下</Button>
  </Popconfirm>
  <br/>
  <Popconfirm placement="topLeft" title={text} onConfirm={confirm}>
    <Button>上左</Button>
  </Popconfirm>
  <Popconfirm placement="top" title={text} onConfirm={confirm}>
    <Button>上</Button>
  </Popconfirm>
  <Popconfirm placement="topRight" title={text} onConfirm={confirm}>
    <Button>上右</Button>
  </Popconfirm>
  <br/>
  <Popconfirm placement="bottomLeft" title={text} onConfirm={confirm}>
    <Button>下左</Button>
  </Popconfirm>
  <Popconfirm placement="bottom" title={text} onConfirm={confirm}>
    <Button>下</Button>
  </Popconfirm>
  <Popconfirm placement="bottomRight" title={text} onConfirm={confirm}>
    <Button>下右</Button>
  </Popconfirm>
  <br/>
  <Popconfirm placement="rightTop" title={text} onConfirm={confirm}>
    <Button>右上</Button>
  </Popconfirm>
  <Popconfirm placement="right" title={text} onConfirm={confirm}>
    <Button>右</Button>
  </Popconfirm>
  <Popconfirm placement="rightBottom" title={text} onConfirm={confirm}>
    <Button>右下</Button>
  </Popconfirm>
</div>, document.getElementById('components-popconfirm-demo-placement'));
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
