import { Button, Popover, Space } from 'antd';
import React, { useState } from 'react';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const content = (
    <div>
      <div className="content" style={{ paddingBottom: '15px' }}>
        Are you sure to examine and verify this task?
      </div>
      <div className="footer" style={{ textAlign: 'right' }}>
        <Space>
          <Button type="primary" onClick={hide}>
            Success
          </Button>
          <Button type="primary" danger onClick={hide}>
            Fail
          </Button>
          <Button onClick={hide}>Cancel</Button>
        </Space>
      </div>
    </div>
  );

  return (
    <Space>
      <Popover
        content={content}
        title={() => ''}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary">Click me</Button>
      </Popover>
    </Space>
  );
};

export default App;
