---
order: 1
title:
  zh-CN: 偏移
  en-US: Offset
---

## zh-CN

达到一定的偏移量才触发。

## en-US

Affix element according to offset value.

````jsx
import { Affix, Button } from 'antd';

ReactDOM.render(
  <Affix offsetTop={75}>
    <Button type="primary">75px to affix top</Button>
  </Affix>
, mountNode);
````
