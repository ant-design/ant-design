---
order: 6
title:
  zh-CN: 幽灵折叠面板
  en-US: Ghost Collapse
---

## zh-CN

将折叠面板的背景变成透明。

## en-US

Making collapse's background to transparent.

```jsx
import { Collapse } from '@allenai/varnish';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Collapse defaultActiveKey={['1']} ghost>
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>{text}</p>
    </Panel>
  </Collapse>,
  mountNode,
);
```
