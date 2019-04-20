---
order: 1
title:
  zh-CN: 手风琴
  en-US: Accordion
---

## zh-CN

手风琴，每次只打开一个tab。默认打开第一个。

## en-US

In accordion mode, only one panel can be expanded at a time. The first panel will be expanded by default.

````jsx
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Collapse accordion>
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
  mountNode
);
````
