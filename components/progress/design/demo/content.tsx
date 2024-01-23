import React from 'react';
import { Flex, Progress, theme } from 'antd';

const Demo = () => {
  const { token } = theme.useToken();

  return (
    <Flex gap="large">
      <Flex gap="small" align="center">
        <Progress size={16} type="circle" percent={68} trailColor={token.colorPrimaryBg} />
        <div>进行中</div>
      </Flex>
      <Flex gap="small" align="center">
        <Progress size={16} type="circle" percent={100} status="success" />
        <div>已完成</div>
      </Flex>
      <Flex gap="small" align="center">
        <Progress
          size={16}
          type="circle"
          percent={68}
          status="exception"
          trailColor={token.colorErrorBg}
        />
        <div>错误/异常</div>
      </Flex>
    </Flex>
  );
};

export default Demo;
