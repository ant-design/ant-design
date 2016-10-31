---
debug: true
order: -1
title: Colorful Tags for Debugging
---

`Tag[color]` is deprecated, but we need this demo for debugging until next major version.

````jsx
import { Tag } from 'antd';

ReactDOM.render(
  <div>
    <Tag closable color="blue">Blue</Tag>
    <Tag closable color="green">Green</Tag>
    <Tag closable color="yellow"><a href="https://github.com/ant-design/ant-design/issues/1862">Yellow</a></Tag>
    <Tag closable color="red">Red</Tag>
  </div>,
  mountNode
);
````
