import React from 'react';
import { Flex, Typography, version } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';
import { combinedRoute } from './routes';

/**
 * 如果你在本地想调试不同的组件，直接修改这个常量即可
 * If you want to debug different components locally, just modify this constant
 * e.g:
 * 1. const DEMO_PATH = '/table/demo/basic';
 * 2. > VITE_DEMO_ID=/table/demo/basic npm run play
 */
const DEMO_PATH = import.meta.env.VITE_DEMO_ID || '/button/demo/basic';

function HomePage() {
  return (
    <Flex
      style={{ height: 'calc(100dvh - 48px)' }}
      justify="center"
      align="center"
      vertical
      gap="large"
    >
      <Typography.Title level={5}>v{version}</Typography.Title>
      <Flex vertical wrap="nowrap" gap="middle">
        {Object.entries(combinedRoute).map(([key, item]) => (
          <Link key={key} to={item.path + DEMO_PATH}>
            {item.path?.slice(1)}
            <sub>{DEMO_PATH}</sub>
          </Link>
        ))}
      </Flex>
    </Flex>
  );
}

export default HomePage;
