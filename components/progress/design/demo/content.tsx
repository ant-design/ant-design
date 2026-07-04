import React from 'react';
import { Flex, Progress, theme } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    progress: '进行中',
    completed: '已完成',
    exception: '异常',
  },
  en: {
    progress: 'In Progress',
    completed: 'Completed',
    exception: 'Exception',
  },
};

const Demo: React.FC = () => {
  const { token } = theme.useToken();
  const [locale] = useLocale(locales);
  return (
    <Flex gap="large">
      <Flex gap="small" align="center">
        <Progress size={16} type="circle" percent={68} railColor={token.colorPrimaryBg} />
        <div>{locale.progress}</div>
      </Flex>
      <Flex gap="small" align="center">
        <Progress size={16} type="circle" percent={100} status="success" />
        <div>{locale.completed}</div>
      </Flex>
      <Flex gap="small" align="center">
        <Progress
          size={16}
          type="circle"
          percent={68}
          status="exception"
          railColor={token.colorErrorBg}
        />
        <div>{locale.exception}</div>
      </Flex>
    </Flex>
  );
};

export default Demo;
