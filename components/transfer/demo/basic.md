---
order: 0
title:
  zh-CN: 基本用法
  en-US: Basic
---

## zh-CN

最基本的用法，展示了 `dataSource`、`targetKeys`、每行的渲染函数 `render` 以及回调函数 `onBeforeChange` `onChange` `onSelectChange` `onScroll` 的用法。

## en-US

The most basic usage of `Transfer` involves providing the source data and target keys arrays, plus the rendering and some callback functions.

```jsx
import React, { useState } from 'react';
import { Transfer, Modal, Radio, Divider } from 'antd';

const mockData = [];
for (let i = 0; i < 20; i++) {
  mockData.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
  });
}

const initialTargetKeys = mockData.filter(item => +item.key > 10).map(item => item.key);

const App = () => {
  const [targetKeys, setTargetKeys] = useState(initialTargetKeys);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [value, setValue] = React.useState(1);
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    setTargetKeys(nextTargetKeys);
  };

  // onBeforeChange与onChange不能同时使用
  const onBeforeChange = (nextTargetKeys, direction, moveKeys, next) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    Modal.confirm({
      title: 'sue to move ?',
      onOk: () => {
        next();
        setTargetKeys(nextTargetKeys);
      },
    });
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    console.log('sourceSelectedKeys:', sourceSelectedKeys);
    console.log('targetSelectedKeys:', targetSelectedKeys);
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };

  const onEventTypeChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
    setSelectedKeys([]);
  };

  return (
    <div>
      <Radio.Group onChange={onEventTypeChange} value={value}>
        <Radio value={1}>use onChange</Radio>
        <Radio value={2}>use onBeforeChange</Radio>
      </Radio.Group>
      <Divider />
      <Transfer
        dataSource={mockData}
        titles={['Source', 'Target']}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={value === 1 && onChange}
        onBeforeChange={value === 2 && onBeforeChange}
        onSelectChange={onSelectChange}
        onScroll={onScroll}
        render={item => item.title}
      />
    </div>
  );
};

ReactDOM.render(<App />, mountNode);
```
