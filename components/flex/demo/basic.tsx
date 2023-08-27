import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Flex, Popconfirm, Upload } from 'antd';

const App: React.FC = () => (
  <Flex justify="space-around" align="center">
    <Button>Flex</Button>
    <Button type="primary">Button</Button>
    <Upload>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
    <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
      <Button>Confirm</Button>
    </Popconfirm>
  </Flex>
);

export default App;
