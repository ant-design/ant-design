---
order: 5
title:
  zh-CN: 向上展开
  en-US: Placement
---

## zh-CN

向上展开建议。

## en-US

Change the suggestions placement.

```jsx
import { Mentions } from 'antd';

const { Option } = Mentions;

ReactDOM.render(
  <Mentions style={{ width: '100%' }} placement="top">
    <Option value="afc163">afc163</Option>
    <Option value="zombieJ">zombieJ</Option>
    <Option value="yesmeck">yesmeck</Option>
  </Mentions>,
  mountNode,
);
```
