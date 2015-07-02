# 带有图标的

- order: 1

图标放在文字前面。

---

````jsx
var Breadcrumb = antd.Breadcrumb;

React.render(
  <Breadcrumb>
    <Breadcrumb.Item href="">
      <i className="anticon anticon-user"></i>
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <i className="anticon anticon-folder-open"></i>
      应用列表
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      应用
    </Breadcrumb.Item>
  </Breadcrumb>
, document.getElementById('components-breadcrumb-demo-withicon'));
````

