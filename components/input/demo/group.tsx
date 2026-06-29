import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import {
  AutoComplete,
  Button,
  Cascader,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Select,
  Tooltip,
} from 'antd';

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
    <Input.Group size="large">
      <Row gutter={8}>
        <Col span={5}>
          <Input defaultValue="0571" />
        </Col>
        <Col span={8}>
          <Input defaultValue="26888888" />
        </Col>
      </Row>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input style={{ width: '20%' }} defaultValue="0571" />
      <Input style={{ width: '30%' }} defaultValue="26888888" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
      <Button type="primary">Submit</Button>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input
        style={{ width: 'calc(100% - 200px)' }}
        defaultValue="git@github.com:ant-design/ant-design.git"
      />
      <Tooltip title="search git url">
        <Button icon={<SearchOutlined />} />
      </Tooltip>
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select
        defaultValue="Zhejiang"
        options={[
          { label: 'Zhejiang', value: 'Zhejiang' },
          { label: 'Jiangsu', value: 'Jiangsu' },
          { label: 'Other', value: 'Other' },
        ]}
      />
      <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input.Search allowClear style={{ width: '40%' }} defaultValue="0571" />
      <Input.Search allowClear style={{ width: '40%' }} defaultValue="26888888" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select
        defaultValue="Option1"
        options={[
          { label: 'Option1', value: 'Option1' },
          { label: 'Option2', value: 'Option2' },
        ]}
      />
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <InputNumber prefix="@" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <DatePicker style={{ width: '50%' }} />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input style={{ width: '30%' }} defaultValue="input content" />
      <DatePicker.RangePicker style={{ width: '70%' }} />
    </Input.Group>
    <br />
    <Input.Group compact>
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
    </Input.Group>
    <br />
    <Input.Group compact>
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
        style={{ width: 100, textAlign: 'center' }}
        placeholder="Maximum"
      />
    </Input.Group>
    <br />
    <Input.Group compact>
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
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select
        style={{ width: '30%' }}
        defaultValue="Home"
        options={[
          { label: 'Home', value: 'Home' },
          { label: 'Company', value: 'Company' },
        ]}
      />
      <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
    </Input.Group>
  </div>
);

export default App;
