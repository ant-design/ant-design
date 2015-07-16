# 位置

- order: 1

位置有四个方向。

---

````jsx
var Popconfirm = antd.Popconfirm;
var message = antd.message;
var text = '确认文案';

function confirm() {
  message.info('点击了确定');
}

React.render(<div>
  <Popconfirm placement="left" title={text} onConfirm={confirm}>
    <a href="javascript:;">左边</a>
  </Popconfirm>
  <Popconfirm placement="right" title={text} onConfirm={confirm}>
    <a href="javascript:;">右边</a>
  </Popconfirm>
  <Popconfirm placement="top" title={text} onConfirm={confirm}>
    <a href="javascript:;">上边</a>
  </Popconfirm>
  <Popconfirm placement="bottom" title={text} onConfirm={confirm}>
    <a href="javascript:;">下边</a>
  </Popconfirm>
</div>, document.getElementById('components-popconfirm-demo-placement'));
````

<style>
.code-box-demo .ant-popover-wrap > a {
  margin-right: 1em;
}
</style>
