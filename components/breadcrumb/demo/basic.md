# 基本

- order: 0

最简单的用法，存在 `href` 表示可点。

---

````jsx
import { Breadcrumb } from 'antd';

ReactDOM.render(
  <Breadcrumb>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
    <Breadcrumb.Item>某应用</Breadcrumb.Item>
  </Breadcrumb>
, document.getElementById('components-breadcrumb-demo-basic'));
````
