import React from 'react';
import { CopyOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Cascader, Flex, Input, InputNumber, Select, Space, TimePicker } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Space.Compact block>
      <Space.Compact>
        <Space.Compact>
          <Input style={{ width: 90 }} placeholder="Typing..." />
          <Button icon={<SearchOutlined />} />
        </Space.Compact>
        <Space.Compact>
          <InputNumber defaultValue={12} />
          <Select
            defaultValue="Option1"
            options={[
              { label: 'Opt1', value: 'Option1' },
              { label: 'Opt2', value: 'Option2' },
            ]}
          />
        </Space.Compact>
      </Space.Compact>
      <Button type="primary">Separator</Button>
      <Space.Compact>
        <Space.Compact>
          <Input.Search style={{ width: 110 }} placeholder="Search" />
          <Button type="primary">Submit</Button>
        </Space.Compact>
        <Space.Compact>
          <Input defaultValue="mysite" />
          <Button icon={<CopyOutlined />} />
        </Space.Compact>
      </Space.Compact>
    </Space.Compact>

    <Space.Compact block>
      <Space.Compact>
        <TimePicker />
        <Button type="primary">Submit</Button>
      </Space.Compact>
      <Button type="primary">~</Button>
      <Button type="primary">~</Button>
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

    <Space.Compact>
      <Button color="default" variant="solid">
        Button 1
      </Button>
      <Button color="default" variant="solid">
        Button 2
      </Button>
      <Button color="danger" variant="solid">
        Button 3
      </Button>
      <Button color="danger" variant="solid">
        Button 4
      </Button>
    </Space.Compact>
  </Flex>
);

export default App;
