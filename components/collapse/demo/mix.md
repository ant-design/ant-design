---
order: 2
title:
  zh-CN: 面板嵌套
  en-US: Nested panel
---

## zh-CN

嵌套折叠面板。

## en-US

`Collapse` is nested inside the `Collapse`.

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
  <Collapse onChange={callback}>
    <Panel header="This is panel header 1" key="1">
      <Collapse defaultActiveKey="1">
        <Panel header="This is panel nest panel" key="1">
          <p>{text}</p>
        </Panel>
      </Collapse>
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
