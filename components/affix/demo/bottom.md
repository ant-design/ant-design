---
order: 2
title:
  zh-CN: 下方固定
  en-US: Bottom
---

## zh-CN

固定在屏幕下方。

## en-US

Affix to bottom.

````jsx
import { Affix, Button } from 'antd';

ReactDOM.render(
  <Affix offsetBottom={20}>
    <Button type="primary">20px to affix bottom</Button>
  </Affix>
, mountNode);
````
