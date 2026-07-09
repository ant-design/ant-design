import React, { useState } from 'react';
import { Footer, Radio, Space } from 'antd';
import { GithubOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

const columns = [
  {
    title: 'Product',
    items: [
      {
        title: 'Ant Design',
        url: 'https://ant.design',
        openExternal: true,
        description: 'React UI library',
      },
      {
        title: 'Ant Design Pro',
        url: 'https://pro.ant.design',
        openExternal: true,
        description: 'Enterprise UI solution',
      },
      {
        title: 'Ant Design Mobile',
        url: 'https://mobile.ant.design',
        openExternal: true,
        description: 'Mobile UI library',
      },
    ],
  },
  {
    title: 'Resources',
    items: [
      {
        title: 'React',
        url: 'https://reactjs.org',
        openExternal: true,
      },
      {
        title: 'TypeScript',
        url: 'https://typescriptlang.org',
        openExternal: true,
      },
    ],
  },
  {
    title: 'Community',
    items: [
      {
        title: 'GitHub',
        url: 'https://github.com/ant-design/ant-design',
        openExternal: true,
        icon: <GithubOutlined />,
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/antdesign',
        openExternal: true,
        icon: <TwitterOutlined />,
      },
      {
        title: 'Instagram',
        url: 'https://instagram.com/antdesign',
        openExternal: true,
        icon: <InstagramOutlined />,
      },
    ],
  },
  {
    title: 'Other',
    items: [
      {
        title: 'GitHub',
        url: 'https://github.com/ant-design/ant-design',
        openExternal: true,
        icon: <GithubOutlined />,
      },
      {
        title: 'Twitter',
        url: 'https://twitter.com/antdesign',
        openExternal: true,
        icon: <TwitterOutlined />,
      },
      {
        title: 'Instagram',
        url: 'https://instagram.com/antdesign',
        openExternal: true,
        icon: <InstagramOutlined />,
      },
    ],
  },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <Space vertical style={{ width: '100%' }}>
      <Radio.Group value={theme} onChange={(e) => setTheme(e.target.value)}>
        <Radio.Button value="dark">Dark</Radio.Button>
        <Radio.Button value="light">Light</Radio.Button>
      </Radio.Group>
      <Footer columns={columns} theme={theme} bottom="Made with ❤️ by Ant Design" />
    </Space>
  );
};

export default App;
