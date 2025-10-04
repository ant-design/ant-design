import React from 'react';
import { Alert, Flex } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    welcomeMessage: '你好！欢迎使用专业版，你可以根据自身需求添加业务模块。',
    helpTitle: '帮助信息',
    helpDescription:
      '你好，由于你的良好信用，我们决定赠送你三个月产品会员，欲了解会员特权与活动请进首页会员专区查看。',
  },
  en: {
    welcomeMessage:
      'Hello! Welcome to use the professional version. You can add business modules according to your needs.',
    helpTitle: 'Help Information',
    helpDescription:
      'Hello, due to your good credit, we have decided to give you a three-month product membership. To learn about membership privileges and activities, please visit the membership section on the homepage.',
  },
};

const Demo: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <Flex gap="middle" vertical style={{ maxWidth: 600 }}>
      <Alert message={locale.welcomeMessage} />
      <Alert message={locale.helpTitle} description={locale.helpDescription} />
    </Flex>
  );
};

export default Demo;
