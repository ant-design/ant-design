import React from 'react';
import { Flex, Progress } from 'antd';

const Demo = () => (
  <Flex vertical gap="middle">
    <Flex>
      <div style={{ width: 106 }}>任务进行中</div>
      <Progress type="line" percent={50} showInfo={false} style={{ width: 320 }} />
    </Flex>
    <Flex>
      <div style={{ width: 106 }}>任务完成</div>
      <Progress
        type="line"
        percent={100}
        status="success"
        showInfo={false}
        style={{ width: 320 }}
      />
    </Flex>
    <Flex>
      <div style={{ width: 106 }}>任务失败</div>
      <Progress
        type="line"
        percent={30}
        status="exception"
        showInfo={false}
        style={{ width: 320 }}
      />
    </Flex>
  </Flex>
);

export default Demo;
