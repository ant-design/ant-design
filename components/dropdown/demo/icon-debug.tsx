import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space } from 'antd';

const App: React.FC = () => (
  <Space>
    <Dropdown.Button icon={<DownOutlined />} menu={{ items: [] }}>
      Submit
    </Dropdown.Button>
    <Dropdown.Button icon={<DownOutlined />} placement="top" menu={{ items: [] }}>
      Submit
    </Dropdown.Button>
    <Space.Compact>
      <Button type="primary">Submit</Button>
      <Dropdown menu={{ items: [] }}>
        <Button type="primary" icon={<DownOutlined />} />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Button>Submit</Button>
      <Dropdown menu={{ items: [] }} placement="top">
        <Button icon={<DownOutlined />} />
      </Dropdown>
    </Space.Compact>
  </Space>
);

export default App;
