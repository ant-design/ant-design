import React from 'react';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Divider, Flex, Tag } from 'antd';

const variants = ['filled', 'solid', 'outlined'] as const;
const presets = [
  { status: 'success', icon: <CheckCircleOutlined /> },
  { status: 'processing', icon: <SyncOutlined spin /> },
  { status: 'warning', icon: <ExclamationCircleOutlined /> },
  { status: 'error', icon: <CloseCircleOutlined /> },
  { status: 'default', icon: <ClockCircleOutlined /> },
];

const App: React.FC = () => (
  <>
    {variants.map((variant) => (
      <div key={variant}>
        <Divider titlePlacement="start">Status ({variant})</Divider>
        <Flex gap="small" align="center" wrap>
          {presets.map(({ status, icon }) => (
            <Tag key={status} color={status} icon={icon} variant={variant}>
              {status}
            </Tag>
          ))}
        </Flex>
      </div>
    ))}
  </>
);

export default App;
