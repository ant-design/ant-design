import React from 'react';

import useLocale from '../../../.dumi/hooks/useLocale';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const locales = {
  cn: {
    title: '跳转页面',
    jumpToSpecificPage: '跳转至指定页面',
    adjustItemsPerPage: '调整单页展示条数',
    quickJump: '快速跳转',
    understandTotalData: '了解数据总量',
  },
  en: {
    title: 'Navigate Pages',
    jumpToSpecificPage: 'Jump to Specific Page',
    adjustItemsPerPage: 'Adjust Items Per Page',
    quickJump: 'Quick Jump',
    understandTotalData: 'Understand Total Data',
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
            label: locale.jumpToSpecificPage,
            targetType: 'mvp',
          },
          {
            id: '200000005',
            label: locale.adjustItemsPerPage,
            targetType: 'extension',
            link: 'pagination-index-tab-design-demo-page-size',
          },
          {
            id: '200000006',
            label: locale.quickJump,
            targetType: 'extension',
            link: 'pagination-index-tab-design-demo-quick-jump',
          },
          {
            id: '200000007',
            label: locale.understandTotalData,
            targetType: 'extension',
            link: 'pagination-index-tab-design-demo-total',
          },
        ],
      }}
    />
  );
};

export default BehaviorPattern;
