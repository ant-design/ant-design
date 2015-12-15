# 国际化

- order: 2

设置 `okText` `cancelText` 以自定义按钮文字。

---

````jsx
import { Popconfirm } from 'antd';

ReactDOM.render(
  <Popconfirm title="Are you sure？" okText="Yes" cancelText="No">
    <a href="#">Delete</a>
  </Popconfirm>
, document.getElementById('components-popconfirm-demo-locale'));
````
