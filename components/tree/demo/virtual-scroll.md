---
order: 9
title:
  zh-CN: 虚拟滚动
  en-US: Virtual scroll
---

## zh-CN

使用 `height` 属性则切换为虚拟滚动。

## en-US

Use virtual list through `height` prop.

```tsx
import { Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import React from 'react';

const dig = (path = '0', level = 3) => {
  const list = [];
  for (let i = 0; i < 10; i += 1) {
    const key = `${path}-${i}`;
    const treeNode: DataNode = {
      title: key,
      key,
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    }

    list.push(treeNode);
  }
  return list;
};

const treeData = dig();

const App: React.FC = () => <Tree treeData={treeData} height={233} defaultExpandAll />;

export default App;
```
