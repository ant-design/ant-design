import React from 'react';
/*
 * iframe: 360
 */

import { FloatButton } from 'antd';
import { CustomerServiceOutlined, CommentOutlined } from '@ant-design/icons';

const App: React.FC = () => (
  <FloatButton.Group icon={<CustomerServiceOutlined />} type="primary" trigger="click">
    <FloatButton />
    <FloatButton icon={<CommentOutlined />} />
  </FloatButton.Group>
);

export default App;
