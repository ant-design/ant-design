## Basic Usage

Basic Footer with columns and bottom content.

```jsx
import React from 'react';
import { GithubOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';
import { Footer } from 'antd';

const columns = [
  {
    title: 'Product',
    items: [
      {
        title: 'Ant Design',
        url: 'https://ant.design',
        openExternal: true,
      },
      {
        title: 'Ant Design Pro',
        url: 'https://pro.ant.design',
        openExternal: true,
      },
      {
        title: 'Ant Design Mobile',
        url: 'https://mobile.ant.design',
        openExternal: true,
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
];

export default () => <Footer columns={columns} bottom="Made with ❤️ by Ant Design" />;
```
