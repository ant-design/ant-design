# 基本用法

- order: 0

作为页面元素使用。

---

````jsx
var Spin = antd.Spin;
var container = document.getElementById('components-spin-demo-page-element');

ReactDOM.render(
  <div>
    <div className="example">
      <Spin size="small" />
    </div>
  </div>, container);

````
<style>
  .example {
    text-align: center;
    width: 100%;
    background: rgba(0,0,0,0.05);
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
</style>