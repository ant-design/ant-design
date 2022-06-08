---
order: 99
debug: true
title:
  zh-CN: 嵌套
  en-US: Nest
---

## zh-CN

默认选中第一项。

## en-US

Default activate first tab.

```tsx
import { Select, Tabs } from 'antd';
import React, { useState } from 'react';

const { TabPane } = Tabs;
const { Option } = Select;

const positionList = ['left', 'right', 'top', 'bottom'];

const list = Array.from({ length: 20 }).map((_, index) => index);

const App: React.FC = () => {
  const [parentPos, setParentPos] = useState(undefined);
  const [childPos, setChildPos] = useState(undefined);
  const [parentType, setParentType] = useState(undefined);
  const [childType, setChildType] = useState(undefined);

  return (
    <div>
      <Select
        style={{ width: 200 }}
        onChange={val => {
          setParentPos(val);
        }}
      >
        {positionList.map(pos => (
          <Option key={pos} value={pos}>
            Parent - {pos}
          </Option>
        ))}
      </Select>

      <Select
        style={{ width: 200 }}
        onChange={val => {
          setChildPos(val);
        }}
      >
        {positionList.map(pos => (
          <Option key={pos} value={pos}>
            Child - {pos}
          </Option>
        ))}
      </Select>

      <Select
        style={{ width: 200 }}
        onChange={val => {
          setParentType(val);
        }}
      >
        <Option value="line">Parent - line</Option>
        <Option value="card">Parent - card</Option>
        <Option value="editable-card">Parent - card edit</Option>
      </Select>

      <Select
        style={{ width: 200 }}
        onChange={val => {
          setChildType(val);
        }}
      >
        <Option value="line">Child - line</Option>
        <Option value="card">Child - card</Option>
        <Option value="editable-card">Parent - card edit</Option>
      </Select>

      <Tabs defaultActiveKey="1" tabPosition={parentPos} type={parentType}>
        <TabPane tab="Tab 1" key="1">
          <Tabs
            defaultActiveKey="1"
            tabPosition={childPos}
            type={childType}
            style={{ height: 300 }}
          >
            {list.map(key => (
              <TabPane tab={`Tab ${key}`} key={key}>
                TTTT {key}
              </TabPane>
            ))}
          </Tabs>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
```
