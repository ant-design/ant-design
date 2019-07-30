---
order: 4
title:
  zh-CN: 隐藏箭头
  en-US: No arrow
---

## zh-CN

你可以通过 `showArrow={false}` 隐藏 `CollapsePanel` 组件的箭头图标。

## en-US

You can hide the arrow icon by passing `showArrow={false}` to `CollapsePanel` component.

```jsx
import { Collapse } from 'antd';

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Collapse defaultActiveKey={['1']} onChange={callback}>
    <Panel header="This is panel header with arrow icon" key="1">
      <p>{text}</p>
    </Panel>
    <Panel showArrow={false} header="This is panel header with no arrow icon" key="2">
      <p>{text}</p>
    </Panel>
  </Collapse>,
  mountNode,
);
```
