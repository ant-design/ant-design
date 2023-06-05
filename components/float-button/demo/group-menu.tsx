import {
  CommentOutlined,
  CustomerServiceOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { FloatButton } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 74 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 164 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>

      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        open={open}
        onOpenChange={(opened) => setOpen(opened)}
        icon={<QuestionCircleOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
    </>
  );
};

export default App;
