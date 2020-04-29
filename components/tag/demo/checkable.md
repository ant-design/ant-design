---
order: 3
title:
  zh-CN: 可选择
  en-US: Checkable
---

## zh-CN

可通过 `CheckableTag` 实现类似 Checkbox 的效果，点击切换选中效果。

> 该组件为完全受控组件，不支持非受控用法。

## en-US

`CheckableTag` works like Checkbox, click it to toggle checked state.

> it is an absolute controlled component and has no uncontrolled mode.

```jsx
import { Tag } from 'antd';

const { CheckableTag } = Tag;

ReactDOM.render(
  <>
    <CheckableTag>Tag1</CheckableTag>
    <CheckableTag>Tag2</CheckableTag>
    <CheckableTag>Tag3</CheckableTag>
  </>,
  mountNode,
);
```
