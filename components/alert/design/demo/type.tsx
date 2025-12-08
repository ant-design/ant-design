import React from 'react';
import { Alert, Flex } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    successTitle: '成功提示',
    successMessage1: '恭喜！你所提交的信息已经审核通过，如有问题请联系客服。',
    successMessage2: '已成功！',
    successDescription2:
      '你所提交的信息已经审核通过，请及时跟进申请状况。如有问题，请联系审核人员或在线客服。',
    infoTitle: '信息提示',
    infoMessage1: '你好！欢迎使用专业版，你可以根据自身需求添加业务模块。',
    infoMessage2: '帮助信息',
    infoDescription2:
      '你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。',
    warningTitle: '警告提示',
    warningMessage1: '系统将于 15 : 00 - 17 : 00 进行升级，请及时保存你的资料！',
    warningMessage2: '请注意',
    warningDescription2:
      '你所提交的信息已经审核失败，可以进入个人信箱查看原因，如有疑问，请联系客服人员。',
    errorTitle: '错误提示',
    errorMessage1: '系统错误，请稍后重试。',
    errorMessage2: '出错了！',
    errorDescription2:
      '你的账户会员使用权限将在3天后到期，请及时跟进申请状况。如有问题，请联系审核人员。',
  },
  en: {
    successTitle: 'Success Alert',
    successMessage1:
      'Congratulations! Your submitted information has been approved. Please contact customer service if you have any questions.',
    successMessage2: 'Success!',
    successDescription2:
      'Your submitted information has been approved. Please follow up on the application status in time. If you have any questions, please contact the reviewer or online customer service.',
    infoTitle: 'Info Alert',
    infoMessage1:
      'Hello! Welcome to use the professional version. You can add business modules according to your needs.',
    infoMessage2: 'Help Information',
    infoDescription2:
      'Hello, due to your good credit, we have decided to give you a three-month product membership. To learn about membership privileges and activities, please visit the membership section on the homepage.',
    warningTitle: 'Warning Alert',
    warningMessage1:
      'The system will be upgraded from 15:00 - 17:00. Please save your data in time!',
    warningMessage2: 'Please Note',
    warningDescription2:
      'Your submitted information has failed the review. You can check the reason in your personal mailbox. If you have any questions, please contact customer service.',
    errorTitle: 'Error Alert',
    errorMessage1: 'System error, please try again later.',
    errorMessage2: 'Error!',
    errorDescription2:
      'Your account membership privileges will expire in 3 days. Please follow up on the application status in time. If you have any questions, please contact the reviewer.',
  },
};

const Demo: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <Flex gap="large" vertical style={{ maxWidth: 600 }}>
      <Flex gap="middle" vertical>
        <div>{locale.successTitle}</div>
        <Alert showIcon type="success" message={locale.successMessage1} />
        <Alert
          showIcon
          type="success"
          title={locale.successMessage2}
          description={locale.successDescription2}
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>{locale.infoTitle}</div>
        <Alert showIcon type="info" title={locale.infoMessage1} />
        <Alert
          showIcon
          type="info"
          title={locale.infoMessage2}
          description={locale.infoDescription2}
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>{locale.warningTitle}</div>
        <Alert showIcon type="warning" title={locale.warningMessage1} />
        <Alert
          showIcon
          type="warning"
          title={locale.warningMessage2}
          description={locale.warningDescription2}
        />
      </Flex>
      <Flex gap="middle" vertical>
        <div>{locale.errorTitle}</div>
        <Alert showIcon type="error" title={locale.errorMessage1} />
        <Alert
          showIcon
          type="error"
          title={locale.errorMessage2}
          description={locale.errorDescription2}
        />
      </Flex>
    </Flex>
  );
};

export default Demo;
