import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <FloatButton.Group
      open={open}
      trigger="click"
      style={{ right: 24 }}
      icon={<CustomerServiceOutlined />}
      onOpenChange={(opened) => setOpen(opened)}
    >
      <FloatButton />
      <FloatButton icon={<CommentOutlined />} />
    </FloatButton.Group>
  );
};

export default App;
