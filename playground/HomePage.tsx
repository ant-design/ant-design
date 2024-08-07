import React from 'react';
import { Flex, Typography, version } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <Flex
      style={{ height: 'calc(100dvh - 48px)' }}
      justify="center"
      align="center"
      gap="middle"
      wrap="nowrap"
    >
      <Typography.Text>v{version}</Typography.Text>
      <Link to="/button/demo/basic">Normal</Link>
      <Link to="/_dark/button/demo/basic">Dark</Link>
      <Link to="/_compact/button/demo/basic">Compact</Link>
      <Link to="/_cssvar/button/demo/basic">CssVar</Link>
    </Flex>
  );
}

export default HomePage;
