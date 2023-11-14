import React, { useState } from 'react';
import { Button, ColorPicker, Drawer, Popconfirm, Popover, Space, Tooltip } from 'antd';

const App = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <div className="App">
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer1
      </Button>
      <Drawer
        title="Basic Drawer"
        width="80%"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Button type="primary" onClick={() => setOpen2(true)}>
          Open Drawer2
        </Button>

        <Drawer
          title="Second Drawer"
          width="50%"
          placement="right"
          onClose={() => setOpen2(false)}
          open={open2}
        >
          <Space>
            <Tooltip title="Delete the task">
              <Button danger>Tooltip</Button>
            </Tooltip>
            <Popover title="Delete the task">
              <Button danger>Popover</Button>
            </Popover>
            <Popconfirm title="Delete the task">
              <Button danger>popconfirm</Button>
            </Popconfirm>
            <ColorPicker />
          </Space>
        </Drawer>
      </Drawer>
    </div>
  );
};

export default App;
