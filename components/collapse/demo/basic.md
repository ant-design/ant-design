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

```tsx
import { Collapse } from 'antd';
import React from 'react';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <Collapse defaultActiveKey={['1']} onChange={onChange}>
      <Panel header="This is panel header 1" key="1">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2">
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3">
        <p>{text}</p>
      </Panel>
    </Collapse>
  );
};

export default App;
```

<style>
[data-theme="compact"] p, p {
  margin: 0;
}
</style>
