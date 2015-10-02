# 图标按钮

- order: 4

图标一般放在文字前面，也可以单独存在。

---

````jsx
var Icon = antd.Icon;

React.render(
<div className="nico-insert-code">
  <button className="ant-btn ant-btn-primary ant-btn-circle ant-btn-lg">
    <i className="anticon anticon-search"></i>
  </button>
  <button className="ant-btn ant-btn-primary ant-btn-lg">
    <i className="anticon anticon-search"></i>
    大按钮
  </button>

  <button className="ant-btn ant-btn-primary ant-btn-circle">
    <i className="anticon anticon-search"></i>
  </button>
  <button className="ant-btn ant-btn-primary">
    <i className="anticon anticon-search"></i>
    中按钮
  </button>

  <button className="ant-btn ant-btn-primary ant-btn-circle ant-btn-sm">
    <i className="anticon anticon-search"></i>
  </button>
  <button className="ant-btn ant-btn-primary ant-btn-sm">
    <i className="anticon anticon-search"></i>
    小按钮
  </button>

  <p></p>

  <button className="ant-btn ant-btn-ghost ant-btn-circle-outline ant-btn-lg">
    <i className="anticon anticon-search"></i>
  </button>
  <button className="ant-btn ant-btn-ghost ant-btn-circle-outline">
    <i className="anticon anticon-search"></i>
  </button>
  <button className="ant-btn ant-btn-circle-outline ant-btn-sm">
    <i className="anticon anticon-search"></i>
  </button>
</div>
, document.getElementById('components-button-demo-icon'));

````
<style>
.nico-insert-code .ant-btn {
  margin-right: 5px;
}
</style>

