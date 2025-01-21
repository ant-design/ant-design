import React from 'react';

import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const BehaviorPattern: React.FC = () => (
  <BehaviorMap
    data={{
      id: '200000004',
      label: '了解页面/模块内需要关注的提示',
      children: [
        {
          id: '500000061',
          label: '了解提示信息',
          targetType: 'mvp',
          children: [
            {
              id: '707000085',
              label: '了解提示内容',
              link: 'alert-index-tab-design-demo-content',
            },
            {
              id: '707000086',
              label: '了解提示类型',
              link: 'alert-index-tab-design-demo-type',
            },
          ],
        },
        {
          id: '200000005',
          label: '针对提示进行操作',
          targetType: 'extension',
          link: 'alert-index-tab-design-demo-action',
        },
      ],
    }}
  />
);

export default BehaviorPattern;
