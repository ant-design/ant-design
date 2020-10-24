---
order: 3
title:
  zh-CN: 输入框组合
  en-US: Input Group
---

## zh-CN

输入框的组合展现。

注意：使用 `compact` 模式时，不需要通过 `Col` 来控制宽度。

## en-US

Input.Group example.

Note: You don't need `Col` to control the width in the `compact` mode.

```jsx
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';

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

const App = () => (
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
      <Select defaultValue="Zhejiang">
        <Option value="Zhejiang">Zhejiang</Option>
        <Option value="Jiangsu">Jiangsu</Option>
      </Select>
      <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input.Search style={{ width: '30%' }} defaultValue="0571" />
      <Input.Search allowClear style={{ width: '30%' }} defaultValue="26888888" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Input.Search allowClear style={{ width: '40%' }} defaultValue="0571" />
      <Input.Search allowClear style={{ width: '50%' }} defaultValue="26888888" />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="Option1">
        <Option value="Option1">Option1</Option>
        <Option value="Option2">Option2</Option>
      </Select>
      <Input style={{ width: '50%' }} defaultValue="input content" />
      <InputNumber />
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
      <Select defaultValue="Option1-1">
        <Option value="Option1-1">Option1-1</Option>
        <Option value="Option1-2">Option1-2</Option>
      </Select>
      <Select defaultValue="Option2-2">
        <Option value="Option2-1">Option2-1</Option>
        <Option value="Option2-2">Option2-2</Option>
      </Select>
    </Input.Group>
    <br />
    <Input.Group compact>
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
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select defaultValue="Sign Up" style={{ width: '30%' }}>
        <Option value="Sign Up">Sign Up</Option>
        <Option value="Sign In">Sign In</Option>
      </Select>
      <AutoComplete
        style={{ width: '70%' }}
        placeholder="Email"
        options={[{ value: 'text 1' }, { value: 'text 2' }]}
      />
    </Input.Group>
    <br />
    <Input.Group compact>
      <Select style={{ width: '30%' }} defaultValue="Home">
        <Option value="Home">Home</Option>
        <Option value="Company">Company</Option>
      </Select>
      <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
    </Input.Group>
  </div>
);

ReactDOM.render(<App />, mountNode);
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
