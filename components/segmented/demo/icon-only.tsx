import React from 'react';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

// A bare `<svg>` from a third-party icon library, which already aligns itself
// with an inline `vertical-align`. It stays vertically centred in an icon-only item.
const CalendarIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    style={{ verticalAlign: '-0.125em' }}
    role="img"
    aria-label="Calendar"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const Demo: React.FC = () => (
  <Segmented
    options={[
      { value: 'List', icon: <BarsOutlined /> },
      { value: 'Kanban', icon: <AppstoreOutlined /> },
      { value: 'Calendar', icon: <CalendarIcon /> },
    ]}
  />
);

export default Demo;
