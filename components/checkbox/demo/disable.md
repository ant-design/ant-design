# 不可用

- order: 1

checkbox 不可用。

---

````jsx
import { Checkbox } from 'antd';

ReactDOM.render(<div>
  <Checkbox defaultChecked={false} disabled />
  <br />
  <Checkbox defaultChecked disabled />
</div>, document.getElementById('components-checkbox-demo-disable'));
````
