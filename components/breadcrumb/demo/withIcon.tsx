import React from 'react';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

// Icons from third-party libraries (e.g. lucide, react-icons) render as a bare `<svg>`
// rather than an `.anticon` wrapper. It stays centred with, and spaced from, the label.
const ChartIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    <path d="M3 3v18h18" />
    <path d="M7 14l4-4 3 3 5-6" />
  </svg>
);

const App: React.FC = () => (
  <Breadcrumb
    items={[
      {
        href: '',
        title: <HomeOutlined />,
      },
      {
        href: '',
        title: (
          <>
            <UserOutlined />
            <span>Application List</span>
          </>
        ),
      },
      {
        href: '',
        title: (
          <>
            <ChartIcon />
            <span>Dashboard</span>
          </>
        ),
      },
      {
        title: 'Application',
      },
    ]}
  />
);

export default App;
