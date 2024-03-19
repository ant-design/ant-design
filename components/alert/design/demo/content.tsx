import React from 'react';
import { Alert, Flex } from 'antd';

const Demo = () => (
  <Flex gap="middle" vertical style={{ maxWidth: 600 }}>
    <Alert message="你好！欢迎使用专业版，你可以根据自身需求添加业务模块。" />
    <Alert
      message="帮助信息"
      description="你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。"
    />
  </Flex>
);

export default Demo;
