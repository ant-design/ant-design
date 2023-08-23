import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
import { Alert, ConfigProvider } from 'antd';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Alert: {
          withDescriptionIconSize: 32,
          withDescriptionPadding: 16,
        },
      },
    }}
  >
    <Alert
      icon={icon}
      message="Success Tips"
      description="Detailed description and advices about successful copywriting."
      type="success"
      showIcon
    />
  </ConfigProvider>
);

export default App;
