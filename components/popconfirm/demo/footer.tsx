import { Button, Popconfirm, Space } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const onOpenChange = (
    v: boolean,
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (open && v === false) {
      setOpen(v);
    }
    console.log('onOpenChange', v, e);
  };

  return (
    <Popconfirm
      title="Are you sure to delete this task?"
      open={open}
      onOpenChange={onOpenChange}
      // footer={null}
      footer={
        <Space>
          <Button key="back" size="small" onClick={handleCancel}>
            No
          </Button>
          <Button key="submit" size="small" type="primary" loading={loading} onClick={handleOk}>
            Yes
          </Button>
          <Button
            size="small"
            key="link"
            href="https://google.com"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Search on Google
          </Button>
        </Space>
      }
    >
      <Button type="primary" onClick={showPopconfirm}>
        Open Popconfirm with customized footer
      </Button>
    </Popconfirm>
  );
};

export default App;
