import { SmileOutlined } from '@ant-design/icons';
import { Alert, ConfigProvider } from 'antd';
import React from 'react';

const icon = <SmileOutlined />;

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Alert: {
          iconSizeLG: 32,
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
