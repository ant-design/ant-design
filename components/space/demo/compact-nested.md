---
order: 99
version: 4.24.0
title:
  zh-CN: 紧凑布局嵌套
  en-US: Nested Space Compact
debug: true
---

## zh-CN

嵌套使用的紧凑布局

## en-US

Nested `Space.Compact`

```tsx
import { CopyOutlined } from '@ant-design/icons';
import { Button, Cascader, Input, InputNumber, Space, Select, TimePicker } from 'antd';
import React from 'react';

const { Option } = Select;

const App: React.FC = () => (
  <>
    <Space.Compact block>
      <Space.Compact>
        <Input placeholder="Please input something" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <InputNumber defaultValue={12} />
        <Select defaultValue="Option1-1">
          <Option value="Option1-1">Option1-1</Option>
          <Option value="Option1-2">Option1-2</Option>
        </Select>
      </Space.Compact>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Space.Compact>
        <Input addonBefore="http://" addonAfter=".com" defaultValue="mysite" />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <Input defaultValue="mysite" />
        <Button icon={<CopyOutlined />} />
      </Space.Compact>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Space.Compact>
        <TimePicker />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Space.Compact>
        <Cascader
          options={[
            {
              value: 'zhejiang',
              label: 'Zhejiang',
              children: [
                {
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [
                    {
                      value: 'xihu',
                      label: 'West Lake',
                    },
                  ],
                },
              ],
            },
            {
              value: 'jiangsu',
              label: 'Jiangsu',
              children: [
                {
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [
                    {
                      value: 'zhonghuamen',
                      label: 'Zhong Hua Men',
                    },
                  ],
                },
              ],
            },
          ]}
          placeholder="Select Address"
        />
        <Button type="primary">Submit</Button>
      </Space.Compact>
    </Space.Compact>
  </>
);

export default App;
```

```css
[data-theme='compact'] .select-before {
  width: 71px;
}

[data-theme='compact'] .select-after {
  width: 65px;
}
```
