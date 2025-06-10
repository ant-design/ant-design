import React, { useState } from 'react';
import { DownOutlined, EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: 'Submit and continue',
    key: '1',
  },
];

const App: React.FC = () => {
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const enterLoading = (index: number) => {
    setLoadings((state) => {
      const newLoadings = [...state];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((state) => {
        const newLoadings = [...state];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  return (
    <Space vertical>
      <Space.Compact>
        <Button type="primary" loading>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact size="small">
        <Button type="primary" loading>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact>
        <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button type="primary" icon={<EllipsisOutlined />} />
        </Dropdown>
      </Space.Compact>
      <Space.Compact>
        <Button loading={loadings[1]} onClick={() => enterLoading(1)}>
          Submit
        </Button>
        <Dropdown menu={{ items }}>
          <Button icon={<DownOutlined />} />
        </Dropdown>
      </Space.Compact>
    </Space>
  );
};

export default App;
