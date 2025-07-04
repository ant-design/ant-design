import React from 'react';

import useLocale from '../../../.dumi/hooks/useLocale';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const locales = {
  cn: {
    title: '了解任务的进度',
    viewTaskCompletion: '查看任务的完成程度',
    understandTaskProgress: '了解任务进度',
    understandTaskStatus: '了解任务状态',
    viewProgressDescription: '查看进度相关描述',
  },
  en: {
    title: 'Understand Task Progress',
    viewTaskCompletion: 'View Task Completion',
    understandTaskProgress: 'Understand Task Progress',
    understandTaskStatus: 'Understand Task Status',
    viewProgressDescription: 'View Progress-related Description',
  },
};

const BehaviorPattern: React.FC = () => {
  const [locale] = useLocale(locales);
  return (
    <BehaviorMap
      data={{
        id: '200000004',
        label: locale.title,
        children: [
          {
            id: '500000061',
            label: locale.viewTaskCompletion,
            targetType: 'mvp',
            children: [
              {
                id: '707000085',
                label: locale.understandTaskProgress,
                link: 'progress-index-tab-design-demo-progress',
              },
              {
                id: '707000086',
                label: locale.understandTaskStatus,
                link: 'progress-index-tab-design-demo-status',
              },
            ],
          },
          {
            id: '200000005',
            label: locale.viewProgressDescription,
            targetType: 'extension',
            link: 'progress-index-tab-design-demo-info',
          },
        ],
      }}
    />
  );
};

export default BehaviorPattern;
