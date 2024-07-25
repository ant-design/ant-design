import React from 'react';

import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const BehaviorPattern: React.FC = () => (
  <BehaviorMap
    data={{
      id: '200000004',
      label: '跳转页面',
      children: [
        {
          id: '500000061',
          label: '跳转至指定页面',
          targetType: 'mvp',
        },
        {
          id: '200000005',
          label: '调整单页展示条数',
          targetType: 'extension',
          link: 'pagination-index-tab-design-demo-page-size',
        },
        {
          id: '200000006',
          label: '快速跳转',
          targetType: 'extension',
          link: 'pagination-index-tab-design-demo-quick-jump',
        },
        {
          id: '200000007',
          label: '了解数据总量',
          targetType: 'extension',
          link: 'pagination-index-tab-design-demo-total',
        },
      ],
    }}
  />
);

export default BehaviorPattern;
