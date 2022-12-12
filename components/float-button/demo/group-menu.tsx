import React from 'react';
import { FloatButton } from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <FloatButton.Group
    icon={<CustomerServiceOutlined />}
    type="primary"
    trigger='click'
    clickOutAutoClose
  >
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
  </FloatButton.Group>
);

export default App;
