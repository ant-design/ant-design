import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import {
  Cascader,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Select,
  Space,
  TimePicker,
  TreeSelect,
} from 'antd';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const App: React.FC = () => {
  const [mode, setMode] = useState(false);

  const [variant, setVariant] = useState<'outlined' | 'filled' | 'borderless'>('outlined');

  return (
    <>
      <Form {...formItemLayout} style={{ maxWidth: 600 }}>
        <Form.Item label="Style">
          <Radio.Group
            defaultValue="normal"
            onChange={(e) => setMode(e.target.value === 'noStyle')}
          >
            <Radio.Button value="normal">normal</Radio.Button>
            <Radio.Button value="noStyle">no style</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Variant">
          <Radio.Group defaultValue="outlined" onChange={(e) => setVariant(e.target.value)}>
            <Radio.Button value="outlined">outlined</Radio.Button>
            <Radio.Button value="filled">filled</Radio.Button>
            <Radio.Button value="borderless">borderless</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
      <Divider />

      <Form {...formItemLayout} style={{ maxWidth: 600 }} variant={variant}>
        <Space direction="vertical" size={mode ? 'small' : 0} style={{ width: '100%' }}>
          <Form.Item
            label="Fail"
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
            noStyle={mode}
          >
            <Input placeholder="unavailable choice" id="error" />
          </Form.Item>

          <Form.Item label="Warning" validateStatus="warning" noStyle={mode}>
            <Input placeholder="Warning" id="warning" prefix={<SmileOutlined />} />
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="validating"
            help="The information is being validated..."
            noStyle={mode}
          >
            <Input placeholder="I'm the content is being validated" id="validating" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success" noStyle={mode}>
            <Input placeholder="I'm the content" id="success" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning" noStyle={mode}>
            <Input placeholder="Warning" id="warning2" />
          </Form.Item>

          <Form.Item
            label="Fail"
            hasFeedback
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
            noStyle={mode}
          >
            <Input placeholder="unavailable choice" id="error2" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success" noStyle={mode}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning" noStyle={mode}>
            <TimePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error" noStyle={mode}>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error" noStyle={mode}>
            <Select placeholder="I'm Select" allowClear>
              <Option value="1">Option 1</Option>
              <Option value="2">Option 2</Option>
              <Option value="3">Option 3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Validating"
            hasFeedback
            validateStatus="error"
            help="Something breaks the rule."
            noStyle={mode}
          >
            <Cascader
              placeholder="I'm Cascader"
              options={[{ value: 'xx', label: 'xx' }]}
              allowClear
            />
          </Form.Item>

          <Form.Item
            label="Warning"
            hasFeedback
            validateStatus="warning"
            help="Need to be checked"
            noStyle={mode}
          >
            <TreeSelect
              placeholder="I'm TreeSelect"
              treeData={[{ value: 'xx', label: 'xx' }]}
              allowClear
            />
          </Form.Item>

          <Form.Item label="inline" style={{ marginBottom: 0 }} noStyle={mode}>
            <Form.Item
              validateStatus="error"
              help="Please select right date"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              noStyle={mode}
            >
              <DatePicker />
            </Form.Item>
            <span
              style={{
                display: 'inline-block',
                width: '24px',
                lineHeight: '32px',
                textAlign: 'center',
              }}
            >
              -
            </span>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
              noStyle={mode}
            >
              <DatePicker />
            </Form.Item>
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success" noStyle={mode}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success" noStyle={mode}>
            <Input allowClear placeholder="with allowClear" />
          </Form.Item>

          <Form.Item label="Warning" hasFeedback validateStatus="warning" noStyle={mode}>
            <Input.Password placeholder="with input password" />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error" noStyle={mode}>
            <Input.Password allowClear placeholder="with input password and allowClear" />
          </Form.Item>

          <Form.Item label="Success" hasFeedback validateStatus="success" noStyle={mode}>
            <Input.OTP />
          </Form.Item>
          <Form.Item label="Warning" hasFeedback validateStatus="warning" noStyle={mode}>
            <Input.OTP />
          </Form.Item>

          <Form.Item label="Error" hasFeedback validateStatus="error" noStyle={mode}>
            <Input.OTP />
          </Form.Item>

          <Form.Item label="Fail" validateStatus="error" hasFeedback noStyle={mode}>
            <Mentions />
          </Form.Item>

          <Form.Item
            label="Fail"
            validateStatus="error"
            hasFeedback
            help="Should have something"
            noStyle={mode}
          >
            <Input.TextArea allowClear showCount />
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

export default App;
