# 各种大小

- order: 1

小的用于文本加载，默认用于卡片容器级加载，大的用于**页面级**加载。

---

````jsx
import { Spin } from 'antd';

ReactDOM.render(
  <div>
    <Spin size="small" />
    <br />
    <Spin />
    <br />
    <Spin size="large" />
  </div>
, document.getElementById('components-spin-demo-size'));
````
