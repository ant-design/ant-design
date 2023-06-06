import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { FloatButton, Switch } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [show, setShow] = useState(true);
  const [open, setOpen] = useState(true);

  const onChange = (checked: boolean) => {
    setShow(checked);
  };

  return (
    <>
      <FloatButton.Group
        open={open}
        trigger="click"
        type="primary"
        style={{ right: 24 }}
        onOpenChange={(opened) => setOpen(!opened)}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <FloatButton.Group
        open={show}
        trigger="click"
        style={{ right: 94 }}
        icon={<CustomerServiceOutlined />}
      >
        <FloatButton />
        <FloatButton icon={<CommentOutlined />} />
      </FloatButton.Group>
      <Switch onChange={onChange} checked={show} />
    </>
  );
};

export default App;
