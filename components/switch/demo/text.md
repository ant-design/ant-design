---
order: 2
title:
  zh-CN: 文字和图标
  en-US: Text & icon
---

## zh-CN

带有文字和图标。

## en-US

With text and icon.

````__react
import { Switch, Icon } from 'antd';

ReactDOM.render(<div>
  <Switch checkedChildren={'开'} unCheckedChildren={'关'} />
  <br />
  <Switch checkedChildren="1" unCheckedChildren="0" />
  <br />
  <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} />
</div>, mountNode);
````
