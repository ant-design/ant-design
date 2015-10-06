# 菜单按钮

- order: 5

**注**: 下拉按钮的 icon 大小统一成 **10px**。

> 更多交互，详见 [Dropdown 下拉菜单](http://ant.design/components/dropdown/)。

---

````jsx
var Icon = antd.Icon;

React.render(
<div className="nico-insert-code">
  <button className="ant-btn ant-btn-primary ant-btn-menu">
    <span>菜单按钮</span>
    <Icon type="down" />
  </button>
  <button className="ant-btn ant-btn-ghost ant-btn-circle ant-btn-menu">
    <Icon type="down" />
  </button>
</div>
, document.getElementById('components-button-demo-menu'));
````
