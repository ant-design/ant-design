# 位置

- order: 1

位置有四个方向。

---

````jsx
var Popconfirm = antd.Popconfirm;
var text = '确认文案';

function confirm() {
  console.log('点击了确定');
}

React.render(<div>
  <Popconfirm placement="left" title={text} onConfirm={confirm}>
    <button className="ant-btn">左</button>
  </Popconfirm>
  <Popconfirm placement="right" title={text} onConfirm={confirm}>
    <button className="ant-btn">右</button>
  </Popconfirm>
  <Popconfirm placement="top" title={text} onConfirm={confirm}>
    <button className="ant-btn">上</button>
  </Popconfirm>
  <Popconfirm placement="bottom" title={text} onConfirm={confirm}>
    <button className="ant-btn">下</button>
  </Popconfirm>
</div>, document.getElementById('components-popconfirm-demo-placement'));
````

<style>
.code-box-demo .ant-popover-wrap > .ant-btn {
  margin-right: 1em;
}
</style>
