# 大数字

- order: 1

超过 99 的会显示为 `99+`。

---

````jsx
import { Badge } from 'antd';

ReactDOM.render(<div>
  <Badge count={99}>
    <a href="#" className="head-example"></a>
  </Badge>
  <Badge count={200}>
    <a href="#" className="head-example"></a>
  </Badge>
</div>, document.getElementById('components-badge-demo-99plus'));
````
