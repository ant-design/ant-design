import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  Transfer,
  Tree,
  TreeSelect,
  Upload,
} from 'antd';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo: React.FC = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <>
      <Checkbox
        checked={componentDisabled}
        onChange={(e) => setComponentDisabled(e.target.checked)}
      >
        Form disabled
      </Checkbox>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        disabled={componentDisabled}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
          <Checkbox>Checkbox</Checkbox>
        </Form.Item>
        <Form.Item label="Radio">
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Input">
          <Input />
        </Form.Item>
        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="TreeSelect">
          <TreeSelect
            treeData={[
              { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
            ]}
          />
        </Form.Item>
        <Form.Item label="Cascader">
          <Cascader
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
        <Form.Item label="RangePicker">
          <RangePicker />
        </Form.Item>
        <Form.Item label="InputNumber">
          <InputNumber />
        </Form.Item>
        <Form.Item label="TextArea">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Switch" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload action="/upload.do" listType="picture-card">
            <button
              style={{ color: 'inherit', cursor: 'inherit', border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
        <Form.Item label="Slider">
          <Slider />
        </Form.Item>
        <Form.Item label="ColorPicker">
          <ColorPicker />
        </Form.Item>
        <Form.Item label="Rate">
          <Rate />
        </Form.Item>
        <Form.Item label="Mentions">
          <Mentions defaultValue="@afc163" />
        </Form.Item>
        <Form.Item label="Transfer">
          <Transfer
            dataSource={Array.from({ length: 20 }, (_, i) => ({
              key: i.toString(),
              title: `Content ${i + 1}`,
              description: `Description of content ${i + 1}`,
            }))}
            targetKeys={['1', '3', '5']}
            render={(item) => item.title}
          />
        </Form.Item>
        <Form.Item label="Tree">
          <Tree
            checkable
            defaultExpandedKeys={['0-0', '0-1']}
            defaultSelectedKeys={['0-0-0', '0-1-0']}
            defaultCheckedKeys={['0-0-0-0', '0-1-0']}
            treeData={[
              {
                title: 'Parent 1',
                key: '0-0',
                children: [
                  {
                    title: 'Child 1-1',
                    key: '0-0-0',
                    children: [
                      {
                        title: 'Grandchild 1-1-1',
                        key: '0-0-0-0',
                      },
                    ],
                  },
                  {
                    title: 'Child 1-2',
                    key: '0-0-1',
                  },
                ],
              },
              {
                title: 'Parent 2',
                key: '0-1',
                children: [
                  {
                    title: 'Child 2-1',
                    key: '0-1-0',
                  },
                ],
              },
            ]}
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default () => <FormDisabledDemo />;
