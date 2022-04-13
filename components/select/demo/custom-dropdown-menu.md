---
order: 21
title:
  zh-CN: 扩展菜单
  en-US: Custom dropdown
---

## zh-CN

使用 `dropdownRender` 对下拉菜单进行自由扩展。自定义内容点击时会关闭浮层，如果不喜欢关闭，可以添加 `onMouseDown={e => e.preventDefault()}` 进行阻止（更多详情见 [#13448](https://github.com/ant-design/ant-design/issues/13448)）。

## en-US

Customize the dropdown menu via `dropdownRender`. Dropdown menu will be closed if click `dropdownRender` area, you can prevent it by wrapping `onMouseDown={e => e.preventDefault()}` (see more at [#13448](https://github.com/ant-design/ant-design/issues/13448)).

```jsx
import React, { useState } from 'react';
import { Select, Divider, Input, Typography, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

let index = 0;

const App = () => {
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');

  const onNameChange = event => {
    setName(event.target.value);
  };

  const addItem = e => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Input placeholder="Please enter item" value={name} onChange={onNameChange} />
            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined /> Add item
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {items.map(item => (
        <Option key={item}>{item}</Option>
      ))}
    </Select>
  );
};

export default () => <App />;
```
