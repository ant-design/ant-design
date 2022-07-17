---
order: 11
title:
  zh-CN: 自定义新增页签触发器
  en-US: Customized trigger of new tab
---

## zh-CN

隐藏默认的页签增加图标，给自定义触发器绑定事件。

## en-US

Hide default plus icon, and bind event for customized trigger.

```tsx
import { Button, Tabs } from 'antd';
import React, { useRef, useState } from 'react';

const { TabPane } = Tabs;

const defaultPanes = Array.from({ length: 2 }).map((_, index) => {
  const id = String(index + 1);
  return { title: `Tab ${id}`, content: `Content of Tab Pane ${index + 1}`, key: id };
});

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(defaultPanes[0].key);
  const [panes, setPanes] = useState(defaultPanes);
  const newTabIndex = useRef(0);

  const onChange = (key: string) => {
    setActiveKey(key);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    setPanes([...panes, { title: 'New Tab', content: 'New Tab Pane', key: newActiveKey }]);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: string) => {
    const targetIndex = panes.findIndex((pane) => pane.key === targetKey);
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    if (newPanes.length && targetKey === activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
      setActiveKey(key);
    }
    setPanes(newPanes);
  };

  const onEdit = (targetKey: string, action: 'add' | 'remove') => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={add}>ADD</Button>
      </div>
      <Tabs hideAdd onChange={onChange} activeKey={activeKey} type="editable-card" onEdit={onEdit}>
        {panes.map(pane => (
          <TabPane tab={pane.title} key={pane.key}>
            {pane.content}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default App;
```
