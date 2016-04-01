---
order: 0
title: 简单
---

最简单的用法。

````jsx
import { Switch } from 'antd';

function onChange(checked) {
  console.log(`switch to ${checked}`);
}

ReactDOM.render(
  <Switch defaultChecked={false} onChange={onChange} />,
  mountNode
);
````
