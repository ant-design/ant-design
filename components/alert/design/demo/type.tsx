import React from 'react';
import { Alert, Flex } from 'antd';

const Demo = () => (
  <Flex gap="large" vertical style={{ maxWidth: 600 }}>
    <Flex gap="middle" vertical>
      <div>成功提示</div>
      <Alert
        showIcon
        type="success"
        message="恭喜！你所提交的信息已经审核通过，如有问题请联系客服。"
      />
      <Alert
        showIcon
        type="success"
        message="已成功！"
        description="你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。"
      />
    </Flex>
    <Flex gap="middle" vertical>
      <div>信息提示</div>
      <Alert
        showIcon
        type="info"
        message="你好！欢迎使用专业版，你可以根据自身需求添加业务模块。"
      />
      <Alert
        showIcon
        type="info"
        message="帮助信息"
        description="你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。"
      />
    </Flex>
    <Flex gap="middle" vertical>
      <div>警告提示</div>
      <Alert
        showIcon
        type="warning"
        message="系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！"
      />
      <Alert
        showIcon
        type="warning"
        message="请注意"
        description="你所提交的信息已经审核失败，可以进入个人信箱查看原因，如有疑问，请联系客服人员。"
      />
    </Flex>
    <Flex gap="middle" vertical>
      <div>错误提示</div>
      <Alert showIcon type="error" message="系统错误，请稍后重试。" />
      <Alert
        showIcon
        type="error"
        message="出错了！"
        description="你的账户会员使用权限将在3天后到期，请及时跟进申请状况。如有问题，请联系审核人员。"
      />
    </Flex>
  </Flex>
);

export default Demo;
