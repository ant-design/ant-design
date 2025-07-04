import React from 'react';
import { Flex, Progress } from 'antd';

const Demo = () => (
  <Flex gap="middle" align="center">
    <Progress type="circle" percent={68} />
    <Progress type="circle" percent={100} status="success" />
    <Progress type="circle" percent={68} status="exception" />
    <Progress type="circle" percent={68} size="small" />
    <Progress type="circle" percent={100} status="success" size="small" />
    <Progress type="circle" percent={68} status="exception" size="small" />
  </Flex>
);

export default Demo;
