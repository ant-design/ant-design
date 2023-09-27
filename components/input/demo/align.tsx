import React from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  DatePicker,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Select,
  TimePicker,
  TreeSelect,
  Typography,
} from 'antd';

const { Text } = Typography;
const { RangePicker } = DatePicker;

const narrowStyle: React.CSSProperties = {
  width: 50,
};

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

const selectOptions = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
];

const App: React.FC = () => (
  <>
    <Mentions style={{ width: 100 }} rows={1} />
    <Input.TextArea rows={1} style={{ width: 100 }} />
    <Button type="primary">Button</Button>
    <Input style={{ width: 100 }} />
    <Text copyable>Ant Design</Text>
    <Input prefix="1" suffix="2" style={{ width: 100 }} />
    <Input addonBefore="1" addonAfter="2" style={{ width: 100 }} />
    <InputNumber style={{ width: 100 }} />
    <DatePicker style={{ width: 100 }} />
    <TimePicker style={{ width: 100 }} />
    <Select style={{ width: 100 }} defaultValue="jack" options={selectOptions} />
    <Select style={{ width: 100 }} defaultValue="" options={selectOptions} />
    <Select style={{ width: 100 }} options={selectOptions} />
    <TreeSelect style={{ width: 100 }} />
    <Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} />
    <RangePicker />
    <DatePicker picker="month" />
    <Radio.Group defaultValue="a">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
    </Radio.Group>
    <AutoComplete style={{ width: 100 }} placeholder="input here" />
    <br />
    <Input prefix="$" addonBefore="Http://" addonAfter=".com" defaultValue="mysite" />
    <Input style={narrowStyle} suffix="Y" />
    <Input style={narrowStyle} />
    <Input style={narrowStyle} defaultValue="1" suffix="Y" />
  </>
);

export default App;
