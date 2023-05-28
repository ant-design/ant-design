import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { ConfigProvider, Alert, Space } from 'antd';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Alert: {
          alertIconSizeLG: 32,
          alertPaddingHorizontal: 18,
          alertPaddingVertical: 18,
        },
      },
    }}
  >
    <Space direction='vertical'>
      <Alert message="Success Tips" type="success" showIcon />
      <Alert
        icon={icon}
        message="Success Tips"
        description="Detailed description and advices about successful copywriting."
        type="success"
        showIcon
      />
    </Space>
  </ConfigProvider>
);

export default App;
