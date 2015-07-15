# 文字和图标

- order: 2

带有文字和图标。

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-text');

React.render(<div>
  <Switch checkedChildren="开" unCheckedChildren="关" />
  <span> </span>
  <Switch checkedChildren={<i className="anticon anticon-check"></i>} unCheckedChildren={<i className="anticon anticon-cross"></i>} />
</div>, container);
````
