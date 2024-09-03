import React from 'react';

import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const BehaviorPattern: React.FC = () => (
  <BehaviorMap
    data={{
      id: '200000004',
      label: '了解任务的进度',
      children: [
        {
          id: '500000061',
          label: '查看任务的完成程度',
          targetType: 'mvp',
          children: [
            {
              id: '707000085',
              label: '了解任务进度',
              link: 'progress-index-tab-design-demo-progress',
            },
            {
              id: '707000086',
              label: '了解任务状态',
              link: 'progress-index-tab-design-demo-status',
            },
          ],
        },
        {
          id: '200000005',
          label: '查看进度相关描述',
          targetType: 'extension',
          link: 'progress-index-tab-design-demo-info',
        },
      ],
    }}
  />
);

export default BehaviorPattern;
