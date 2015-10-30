# 基本用法

- order: 0

作为页面元素使用。

---

````jsx
import { Spin } from 'antd';

ReactDOM.render(
  <div>
    <div className="example">
      <Spin />
    </div>
  </div>, document.getElementById('components-spin-demo-page-element'));

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