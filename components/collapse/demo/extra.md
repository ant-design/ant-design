---
order: 5
title:
  zh-CN: 额外节点
  en-US: Extra node
---

## zh-CN

可以同时展开多个面板，这个例子默认展开了第一个。

## en-US

More than one panel can be expanded at a time, the first panel is initialized to be active in this case.

````jsx
import { Collapse, Icon } from 'antd';

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
    <Panel header="This is panel header 1" key="1" extra={<Icon type="setting" />}>
      <div>{text}</div>
    </Panel>
    <Panel header="This is panel header 2" key="2" extra={<Icon type="setting" />}>
      <div>{text}</div>
    </Panel>
    <Panel header="This is panel header 3" key="3" extra={<Icon type="setting" />}>
      <div>{text}</div>
    </Panel>
  </Collapse>,
  mountNode
);
````
