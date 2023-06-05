import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <>
    <FloatButton
      shape="circle"
      type="primary"
      style={{ right: 94 }}
      icon={<CustomerServiceOutlined />}
    />
    <FloatButton
      shape="square"
      type="primary"
      style={{ right: 24 }}
      icon={<CustomerServiceOutlined />}
    />
  </>
);

export default App;
