---
order: 99
title:
  zh-CN: debug 复杂紧凑布局
  en-US: debug Complex Compact Mode
debug: true
---

## zh-CN

debug 紧凑布局。

## en-US

debug Space.Compact example.

```tsx
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, Select, Space, Tooltip } from 'antd';
import React from 'react';

const { Option } = Select;

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    Space.Compact 嵌套 Button CopyOutlined、Input、Button CopyOutlined
    <Space.Compact block>
      <Button icon={<CopyOutlined />} />
      <Input addonBefore="http://" addonAfter=".cn" suffix=".com" defaultValue="mysite" />
      <Button type="primary" icon={<CopyOutlined />} />
    </Space.Compact>
    <br />
    单独使用 Input addonAfter 实现：
    <Input addonAfter={<SearchOutlined />} defaultValue="mysite" />
    <br />
    <br />
    单独使用 Input.Search 实现：
    <Input.Search allowClear defaultValue="0571" />
    <br />
    <br />
    Space.Compact 包裹 Input.Search 实现：
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
    </Space.Compact>
    <br />
    <br />
    Space.Compact 嵌套 DatePicker、Input、Button：
    <Space.Compact block>
      <DatePicker.RangePicker style={{ width: '70%' }} />
      <Input style={{ width: '30%' }} defaultValue="input content" />
      <Button type="primary">查询</Button>
    </Space.Compact>
    <br />
    <h2>其他实现：</h2>
    <Space.Compact size="large" block>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '30%' }} defaultValue="26888888" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="github.com:ant-design/ant-design"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="Zhejiang">
        <Option value="Zhejiang">Zhejiang</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
      <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
    </Space.Compact>
    <br />
  </div>
);

export default App;
```
