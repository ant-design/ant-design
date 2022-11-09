import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }} size="large">
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={1}
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
    </Upload>
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      maxCount={3}
      multiple
    >
      <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
    </Upload>
  </Space>
);

export default App;
