---
order: 2
title: 文字和图标
---

带有文字和图标。

````jsx
import { Switch, Icon } from 'antd';

ReactDOM.render(<div>
  <Switch checkedChildren="开" unCheckedChildren="关" />
  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
</div>, mountNode);
````
