import React from 'react';
import { Flex, Progress } from 'antd';

const Demo = () => (
  <Flex vertical gap="middle">
    <Progress type="line" percent={50} style={{ width: 320 }} />
    <Progress percent={50} format={() => '加载中'} style={{ width: 320 }} />
    <Progress percent={100} status="success" style={{ width: 320 }} />
    <Progress percent={70} status="exception" style={{ width: 320 }} />
  </Flex>
);

export default Demo;
