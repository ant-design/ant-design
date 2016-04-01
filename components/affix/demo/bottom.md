---
order: 2
title: 下方固定
---

固定在屏幕下方

````jsx
import { Affix, Button } from 'antd';

ReactDOM.render(
  <Affix offsetBottom={20}>
    <Button type="primary">固定在距离底部 20px 的位置</Button>
  </Affix>
, mountNode);
````
