---
order: 99
debug: true
title:
  zh-CN: 自定义全选文字
  en-US: Custom Select All Labels
---

## zh-CN

自定义穿梭框全选按钮的文字。

## en-US

Custom the labels for select all checkboxs.

```jsx
import React, { useState } from 'react';
import { Transfer } from 'antd';

const mockData = [];
for (let i = 0; i < 10; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const oriTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);

const selectAllLabels = [
  'Select All',
  ({ selectedCount, totalCount }) => `${selectedCount}/${totalCount}`,
];

const App = () => {
  const [targetKeys, setTargetKeys] = useState(oriTargetKeys);
  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={item => item.title}
      selectAllLabels={selectAllLabels}
    />
  );
};

ReactDOM.render(<App />, mountNode);
```
