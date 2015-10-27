# 基本用法

- order: 0

作为页面元素使用。

---

````jsx
var Spin = antd.Spin;
var container = document.getElementById('components-spin-demo-page-element');

var divStyle = {
  textAlign: 'center',
  width: '100%',
  backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: '4px',
    marginBottom: '20px',
    padding: '.66em 1.5em',
    margin: '20px 0'
}

ReactDOM.render(
  <div>
    <div style={ divStyle }>
      <Spin size="small" />
    </div>
  </div>, container);

````