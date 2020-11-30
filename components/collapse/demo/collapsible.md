---
order: 7
title:
  zh-CN: 可折叠触发区域
  en-US: Collapsible
---

## zh-CN

通过 `collapsible` 属性，可以设置面板的可折叠触发区域。

## en-US

Specify the trigger area of collapsible by `collapsible`.

```jsx
import { Collapse, Space } from 'antd';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

ReactDOM.render(
  <Space direction="vertical">
    <Collapse collapsible="header" defaultActiveKey={['1']}>
      <Panel header="This panel can only be collapsed by clicking text" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
    <Collapse collapsible="disabled">
      <Panel header="This panel can't be collapsed" key="1">
        <p>{text}</p>
      </Panel>
    </Collapse>
  </Space>,
  mountNode,
);
```

<style>
[data-theme="compact"] p, p {
  margin: 0;
}
#components-collapse-demo-collapsible .ant-space {
  width: 100%;
}
</style>
