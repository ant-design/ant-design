---
order: 1
title: 偏移
---

达到一定的偏移量才触发。

````jsx
import { Affix, Button } from 'antd';

ReactDOM.render(
  <Affix offsetTop={75}>
    <Button type="primary">固定在距离顶部 75px 的位置</Button>
  </Affix>
, mountNode);
````
