import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

// Icons from third-party libraries (e.g. lucide, react-icons) render as a bare `<svg>`
// rather than an `.anticon` wrapper. It stays vertically centred with the label.
const HeartIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
    <path d="M12 20.7l-1.4-1.3C5.4 14.8 2 11.7 2 8a5 5 0 0 1 10-1.7A5 5 0 0 1 22 8c0 3.7-3.4 6.8-8.6 11.4L12 20.7z" />
  </svg>
);

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="2"
    items={[
      { key: '1', label: 'Tab 1', children: 'Tab 1', icon: <AppleOutlined /> },
      { key: '2', label: 'Tab 2', children: 'Tab 2', icon: <AndroidOutlined /> },
      { key: '3', label: 'Tab 3', children: 'Tab 3', icon: <HeartIcon /> },
    ]}
  />
);

export default App;
