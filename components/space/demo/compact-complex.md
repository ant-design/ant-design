---
order: 3
title:
  zh-CN: 复杂紧凑布局
  en-US: Complex Compact Mode
---

## zh-CN

紧凑布局。

## en-US

Space.Compact example.

```tsx
import {
  CopyOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Menu,
  Dropdown,
  Select,
  Space,
  Tooltip,
} from 'antd';
import React from 'react';

const { Option } = Select;

const options = [
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
];

const App: React.FC = () => (
  <div className="site-input-group-wrapper">
    <Space.Compact size="small" block>
      <Button type="primary">Button 1</Button>
    </Space.Compact>
    <br />
    <Space.Compact size="small" block>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Button type="primary">Button 1</Button>
      <Button type="primary">Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact size="large" block>
      <Button type="primary">Button 1</Button>
      <Button>Button 2</Button>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} disabled />
      </Tooltip>
      <Tooltip title="Tooltip">
        <Button type="primary" icon={<DownloadOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Button type="primary">Button 1</Button>
      <Dropdown
        placement="bottomRight"
        overlay={
          <Menu
            items={[
              {
                key: '1',
                label: '1st item',
              },
              {
                key: '2',
                label: '2nd item',
              },
              {
                key: '3',
                label: '3rd item',
              },
            ]}
          />
        }
        trigger={['click']}
      >
        <Button type="primary" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
    <br />
    <h2>测试 Space.Compact 嵌套 Button CopyOutlined、Input、Button CopyOutlined</h2>
    <Space.Compact block>
      <Button icon={<CopyOutlined />} />
      <Input addonBefore="http://" addonAfter=".cn" suffix=".com" defaultValue="mysite" />
      <Button type="primary" icon={<CopyOutlined />} />
    </Space.Compact>
    <br />
    <h2>单独用 input addon 实现的：</h2>
    <Input addonAfter={<SearchOutlined />} defaultValue="mysite" />
    <br />
    <h2>单独用 Input.Search 实现：</h2>
    <Input.Search allowClear defaultValue="0571" />
    <br />
    <h2>Space.Compact 包裹 Input.Search 实现：</h2>
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
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
    <h2>注意去掉 style 的宽度</h2>
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
    </Space.Compact>
    <Space.Compact block>
      <Input.Search allowClear defaultValue="0571" />
      <Input.Search allowClear defaultValue="26888888" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="Option1">
        <Option value="Option1">Option1</Option>
        <Option value="Option2">Option2</Option>
      </Select>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <InputNumber />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <DatePicker style={{ width: '50%' }} />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input style={{ width: '30%' }} defaultValue="input content" />
      <DatePicker.RangePicker style={{ width: '70%' }} />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="Option1-1">
        <Option value="Option1-1">Option1-1</Option>
        <Option value="Option1-2">Option1-2</Option>
      </Select>
      <Select defaultValue="Option2-2">
        <Option value="Option2-1">Option2-1</Option>
        <Option value="Option2-2">Option2-2</Option>
      </Select>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="1">
        <Option value="1">Between</Option>
        <Option value="2">Except</Option>
      </Select>
      <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderLeft: 0,
          borderRight: 0,
          pointerEvents: 'none',
        }}
        placeholder="~"
        disabled
      />
      <Input
        className="site-input-right"
        style={{
          width: 100,
          textAlign: 'center',
        }}
        placeholder="Maximum"
      />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select defaultValue="Sign Up" style={{ width: '30%' }}>
        <Option value="Sign Up">Sign Up</Option>
        <Option value="Sign In">Sign In</Option>
      </Select>
      <AutoComplete
        style={{ width: '70%' }}
        placeholder="Email"
        options={[{ value: 'text 1' }, { value: 'text 2' }]}
      />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Select style={{ width: '30%' }} defaultValue="Home">
        <Option value="Home">Home</Option>
        <Option value="Company">Company</Option>
      </Select>
      <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        addonBefore="git@"
        defaultValue="github.com:ant-design/ant-design"
        addonAfter=".git"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <br />
    <Space.Compact block>
      <Input.Search
        addonBefore="+86"
        addonAfter="00"
        allowClear
        style={{ width: '40%' }}
        defaultValue="0571"
      />
      <Input.Search allowClear style={{ width: '40%' }} defaultValue="26888888" />
    </Space.Compact>
  </div>
);

export default App;
```

```css
.site-input-group-wrapper .site-input-split {
  background-color: #fff;
}

.site-input-group-wrapper .site-input-right {
  border-left-width: 0;
}

.site-input-group-wrapper .site-input-right:hover,
.site-input-group-wrapper .site-input-right:focus {
  border-left-width: 1px;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right {
  border-right-width: 0;
}

.site-input-group-wrapper .ant-input-rtl.site-input-right:hover,
.site-input-group-wrapper .ant-input-rtl.site-input-right:focus {
  border-right-width: 1px;
}
```

<style>
[data-theme="dark"] .site-input-group-wrapper .site-input-split {
  background-color: transparent;
}
</style>
