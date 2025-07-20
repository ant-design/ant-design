import React from 'react';
import { Flex, Progress } from 'antd';

import useLocale from '../../../../.dumi/hooks/useLocale';

const locales = {
  cn: {
    taskInProgress: '任务进行中',
    taskCompleted: '任务完成',
    taskFailed: '任务失败',
  },
  en: {
    taskInProgress: 'Task In Progress',
    taskCompleted: 'Task Completed',
    taskFailed: 'Task Failed',
  },
};

const Demo: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <Flex vertical gap="middle">
      <Flex>
        <div style={{ width: 106 }}>{locale.taskInProgress}</div>
        <Progress type="line" percent={50} showInfo={false} style={{ width: 320 }} />
      </Flex>
      <Flex>
        <div style={{ width: 106 }}>{locale.taskCompleted}</div>
        <Progress
          type="line"
          percent={100}
          status="success"
          showInfo={false}
          style={{ width: 320 }}
        />
      </Flex>
      <Flex>
        <div style={{ width: 106 }}>{locale.taskFailed}</div>
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
};

export default Demo;
