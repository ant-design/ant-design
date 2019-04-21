---
order: 0
title:
  zh-CN: 折叠面板
  en-US: Collapse
---

## zh-CN

可以同时展开多个面板，这个例子默认展开了第一个。

## en-US

By default, any number of panels can be expanded at a time. The first panel is expanded in this example.

````jsx
import { Collapse } from 'antd';

const Panel = Collapse.Panel;

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
    <Panel header="This is panel header 1" key="1">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>{text}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" disabled>
      <p>{text}</p>
    </Panel>
  </Collapse>,
  mountNode
);
````

<style>
p {
  margin: 0;
}
</style>
