import React from 'react';
import { CopyOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  ColorPicker,
  DatePicker,
  Input,
  InputNumber,
  Select,
  Space,
  TimePicker,
  Tooltip,
  TreeSelect,
} from 'antd';

const { TreeNode } = TreeSelect;

const App: React.FC = () => (
  <Space direction="vertical">
    <Space.Compact block>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '30%' }} defaultValue="26888888" />
    </Space.Compact>
    <Space.Compact block size="small">
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact block>
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact block>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Tooltip title="copy git url">
        <Button icon={<CopyOutlined />} />
      </Tooltip>
    </Space.Compact>
    <Space.Compact block>
      <Select
        allowClear
        defaultValue="Zhejiang"
        options={[
          { label: 'Zhejiang', value: 'Zhejiang' },
          { label: 'Jiangsu', value: 'Jiangsu' },
        ]}
      />
      <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
    </Space.Compact>
    <Space.Compact block>
      <Select
        allowClear
        mode="multiple"
        defaultValue="Zhejiang"
        style={{ width: '50%' }}
        options={[
          { label: 'Zhejiang', value: 'Zhejiang' },
          { label: 'Jiangsu', value: 'Jiangsu' },
        ]}
      />
      <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
    </Space.Compact>
    <Space.Compact block>
      <Input.Search style={{ width: '30%' }} defaultValue="0571" />
      <Input.Search allowClear style={{ width: '50%' }} defaultValue="26888888" />
      <Input.Search style={{ width: '20%' }} defaultValue="+1" />
    </Space.Compact>
    <Space.Compact block>
      <Select
        defaultValue="Option1"
        options={[
          { label: 'Option1', value: 'Option1' },
          { label: 'Option2', value: 'Option2' },
        ]}
      />
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <InputNumber defaultValue={12} />
    </Space.Compact>
    <Space.Compact block>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <DatePicker style={{ width: '50%' }} />
    </Space.Compact>
    <Space.Compact block>
      <DatePicker.RangePicker style={{ width: '70%' }} />
      <Input style={{ width: '30%' }} defaultValue="input content" />
      <Button type="primary">查询</Button>
    </Space.Compact>
    <Space.Compact block>
      <Input style={{ width: '30%' }} defaultValue="input content" />
      <DatePicker.RangePicker style={{ width: '70%' }} />
    </Space.Compact>
    <Space.Compact block>
      <Select
        defaultValue="Option1-1"
        options={[
          { label: 'Option1-1', value: 'Option1-1' },
          { label: 'Option1-2', value: 'Option1-2' },
        ]}
      />
      <Select
        defaultValue="Option2-2"
        options={[
          { label: 'Option2-1', value: 'Option2-1' },
          { label: 'Option2-2', value: 'Option2-2' },
        ]}
      />
    </Space.Compact>
    <Space.Compact block>
      <Select
        defaultValue="1"
        options={[
          { label: 'Between', value: '1' },
          { label: 'Except', value: '2' },
        ]}
      />
      <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
      <Input
        className="site-input-split"
        style={{
          width: 30,
          borderInlineStart: 0,
          borderInlineEnd: 0,
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
    <Space.Compact block>
      <Select
        defaultValue="Sign Up"
        style={{ width: '30%' }}
        options={[
          { label: 'Sign Up', value: 'Sign Up' },
          { label: 'Sign In', value: 'Sign In' },
        ]}
      />
      <AutoComplete
        style={{ width: '70%' }}
        placeholder="Email"
        options={[{ value: 'text 1' }, { value: 'text 2' }]}
      />
    </Space.Compact>
    <Space.Compact block>
      <TimePicker style={{ width: '70%' }} />
      <Cascader
        style={{ width: '70%' }}
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
    </Space.Compact>
    <Space.Compact block>
      <TimePicker.RangePicker />
      <TreeSelect
        showSearch
        style={{ width: '60%' }}
        value="leaf1"
        styles={{
          popup: { root: { maxHeight: 400, overflow: 'auto' } },
        }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={() => {}}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="leaf1" />
            <TreeNode value="leaf2" title="leaf2" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="leaf3" title={<b style={{ color: '#08c' }}>leaf3</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelect>
      <Button type="primary">Submit</Button>
    </Space.Compact>
    <Space.Compact>
      <Input placeholder="input here" />
      <Space.CompactCell>$</Space.CompactCell>
      <InputNumber placeholder="another input" />
      <InputNumber placeholder="another input" />
      <Space.CompactCell>$</Space.CompactCell>
    </Space.Compact>
    <Space.Compact>
      <Input placeholder="input here" />
      <ColorPicker />
    </Space.Compact>
    <Space.Compact>
      <Button type="primary">Button</Button>
      <Input placeholder="input here" />
      <Space.CompactCell>$</Space.CompactCell>
    </Space.Compact>
  </Space>
);

export default App;
