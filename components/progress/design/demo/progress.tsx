import React from 'react';
import { Flex, Progress } from 'antd';

const Demo = () => (
  <Flex vertical gap="middle">
    <Progress type="line" percent={50} showInfo={false} style={{ width: 320 }} />
    <Progress percent={50} showInfo={false} size="small" style={{ width: 100 }} />
  </Flex>
);

export default Demo;
