import React from 'react';

import useLocale from '../../../.dumi/hooks/useLocale';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const locales = {
  cn: {
    title: '了解当前所处页面的位置并向上导航',
    determineLocation: '确定位置',
    understandCurrentPageLocation: '了解当前页面的位置',
    understandSystemHierarchy: '了解系统层级结构',
    upwardNavigation: '向上导航',
    quickNavigation: '快捷导航',
  },
  en: {
    title: 'Understand the location of the current page and navigate upward',
    determineLocation: 'Determine Location',
    understandCurrentPageLocation: 'Understand Current Page Location',
    understandSystemHierarchy: 'Understand System Hierarchy',
    upwardNavigation: 'Upward Navigation',
    quickNavigation: 'Quick Navigation',
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
            label: locale.determineLocation,
            targetType: 'mvp',
            children: [
              {
                id: '707000085',
                label: locale.understandCurrentPageLocation,
                link: 'breadcrumb-index-tab-design-demo-basic',
              },
              {
                id: '707000086',
                label: locale.understandSystemHierarchy,
                link: 'breadcrumb-index-tab-design-demo-basic',
              },
            ],
          },
          {
            id: '200000005',
            label: locale.upwardNavigation,
            targetType: 'mvp',
            link: 'breadcrumb-index-tab-design-demo-basic',
          },
          {
            id: '200000006',
            label: locale.quickNavigation,
            targetType: 'extension',
            link: 'breadcrumb-index-tab-design-demo-overlay',
          },
        ],
      }}
    />
  );
};

export default BehaviorPattern;
