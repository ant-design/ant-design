# 带有图标的

- order: 1

图标放在文字前面。

---

````jsx
import { Breadcrumb, Icon } from 'antd';

ReactDOM.render(
  <Breadcrumb>
    <Breadcrumb.Item href="">
      <Icon type="home" />
    </Breadcrumb.Item>
    <Breadcrumb.Item href="">
      <Icon type="user" />
      应用列表
    </Breadcrumb.Item>
    <Breadcrumb.Item>
      应用
    </Breadcrumb.Item>
  </Breadcrumb>
, document.getElementById('components-breadcrumb-demo-withicon'));
````

