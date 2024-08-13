import React from 'react';
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group
      trigger="click"
      shape="square"
      placement="bottom"
      style={{ insetInlineEnd: 100, bottom: 150 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group
      trigger="click"
      shape="square"
      placement="top"
      style={{ insetInlineEnd: 200, bottom: 150 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group
      trigger="click"
      placement="top"
      style={{ insetInlineStart: 200, bottom: 150 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
    <FloatButton.Group
      trigger="click"
      placement="bottom"
      style={{ insetInlineStart: 100, bottom: 150 }}
      icon={<CustomerServiceOutlined />}
    >
      <FloatButton />
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  </>
);

export default App;
