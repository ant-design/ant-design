import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps, RadioChangeEvent } from 'antd';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Space direction="vertical">
        <Space>
          <span>Placement:</span>
          <Radio.Group value={placement} onChange={onChange}>
            <Radio value="top">top</Radio>
            <Radio value="right">right</Radio>
            <Radio value="bottom">bottom</Radio>
            <Radio value="left">left</Radio>
          </Radio.Group>
        </Space>
        <Button type="primary" onClick={showDrawer}>
          Open Resizable Drawer
        </Button>
      </Space>
      <Drawer
        title="Resizable Drawer"
        placement={placement}
        onClose={onClose}
        open={open}
        resizable
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <div style={{ padding: '16px 0' }}>
          <p>
            Try to drag the edge of this drawer to resize it. The resize should feel smooth and
            responsive. The drawer supports different placements with corresponding resize
            behaviors:
          </p>
          <ul>
            <li>
              <strong>Left:</strong> Drag the right edge to adjust width
            </li>
            <li>
              <strong>Right:</strong> Drag the left edge to adjust width
            </li>
            <li>
              <strong>Top:</strong> Drag the bottom edge to adjust height
            </li>
            <li>
              <strong>Bottom:</strong> Drag the top edge to adjust height
            </li>
          </ul>
          <p>
            Current placement: <strong>{placement}</strong>
          </p>
          <div
            style={{
              marginTop: '20px',
              padding: '20px',
              background: '#f5f5f5',
              borderRadius: '6px',
            }}
          >
            <p>
              <strong>Smooth resizing implementation:</strong>
            </p>
            <ul>
              <li>Transition is disabled during dragging for immediate response</li>
              <li>Transition is restored when dragging ends for smooth completion</li>
              <li>The resize handle has an extended clickable area (6px wide)</li>
              <li>Hardware acceleration is enabled for better performance</li>
            </ul>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default App;
