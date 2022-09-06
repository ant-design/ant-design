---
order: 6
title:
  zh-CN: 线性样式
  en-US: Show Tree Line
---

## zh-CN

通过 `treeLine` 配置线性样式。

## en-US

Use `treeLine` to show the line style.

```tsx
import { Space, Switch, TreeSelect } from 'antd';
import React, { useState } from 'react';

const { TreeNode } = TreeSelect;

const App: React.FC = () => {
  const [treeLine, setTreeLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(false);

  return (
    <Space direction="vertical">
      <Switch
        checkedChildren="treeLine"
        unCheckedChildren="treeLine"
        checked={treeLine}
        onChange={() => setTreeLine(!treeLine)}
      />
      <Switch
        disabled={!treeLine}
        checkedChildren="showLeafIcon"
        unCheckedChildren="showLeafIcon"
        checked={showLeafIcon}
        onChange={() => setShowLeafIcon(!showLeafIcon)}
      />
      <TreeSelect treeLine={treeLine && { showLeafIcon }} style={{ width: 300 }}>
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="my leaf" />
            <TreeNode value="leaf2" title="your leaf" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="sss" title="sss" />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
    </Space>
  );
};

export default App;
```
