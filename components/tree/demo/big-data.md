---
order: 99
title:
  zh-CN: 大数据
  en-US: Big data
debug: true
---

## zh-CN

大数据展示。

## en-US

Plenty of tree nodes.

```jsx
import { Tree } from 'antd';

const treeData = [];

for (let i = 0; i < 100; i += 1) {
  const children = [];

  for (let j = 0; j < 100; j += 1) {
    children.push({
      title: `child ${i}-${j}`,
      key: `l-${i}-${j}`,
    });
  }

  treeData.push({
    title: `parent ${i}`,
    key: `l-${i}`,
    children,
  });
}

const Demo = () => <Tree defaultExpandAll height={400} treeData={treeData} />;

ReactDOM.render(<Demo />, mountNode);
```
