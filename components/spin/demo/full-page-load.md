# 基本用法

- order: 2

区块加载。

---

````jsx

var Spin = antd.Spin;
var container = document.getElementById('components-spin-demo-full-page-load');

var pageStyle = {
  paddingBottom: '60px',
  paddingTop: '60px',
  textAlign: 'center'
}

ReactDOM.render(
  <div style={ pageStyle }>
    <Spin size="large" type="primary" />
  </div>, container);

````