---
order: 2
title:
  zh-CN: 从数据直接生成
  en-US: Generate from tree data
---

## zh-CN

使用 `treeData` 把 JSON 数据直接生成树结构。

## en-US

The tree structure can be populated using `treeData` property. This is a quick and easy way to provide the tree content.

```tsx
import { TreeSelect } from 'antd';
import React, { useState } from 'react';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string>();

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <TreeSelect
      style={{ width: '100%' }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default App;
```
