import React from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space, Modal } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '1',
  },
  {
    key: '2',
    label: '2',
  },
  {
    key: '3',
    label: '3',
  },
  {
    key: '4',
    label: '4',
  },
];

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <Dropdown key={index} menu={{ items, onClick: () => setOpen(true) }}>
            <div onClick={(e) => e.preventDefault()}>
              <Space>
                Hover me
                <DownOutlined />
              </Space>
            </div>
          </Dropdown>
        ))}

      <Modal title="title" open={open} onCancel={() => setOpen(false)} />
    </>
  );
};

export default App;
