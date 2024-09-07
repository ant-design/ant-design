import React from 'react';

import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const BehaviorPattern: React.FC = () => (
  <BehaviorMap
    data={{
      id: '200000004',
      label: '了解当前所处页面的位置并向上导航',
      children: [
        {
          id: '500000061',
          label: '确定位置',
          targetType: 'mvp',
          children: [
            {
              id: '707000085',
              label: '了解当前页面的位置',
              link: 'breadcrumb-index-tab-design-demo-basic',
            },
            {
              id: '707000086',
              label: '了解系统层级结构',
              link: 'breadcrumb-index-tab-design-demo-basic',
            },
          ],
        },
        {
          id: '200000005',
          label: '向上导航',
          targetType: 'mvp',
          link: 'breadcrumb-index-tab-design-demo-basic',
        },
        {
          id: '200000006',
          label: '快捷导航',
          targetType: 'extension',
          link: 'breadcrumb-index-tab-design-demo-overlay',
        },
      ],
    }}
  />
);

export default BehaviorPattern;
