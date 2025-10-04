import React from 'react';

import useLocale from '../../../.dumi/hooks/useLocale';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const locales = {
  cn: {
    title: '了解页面/模块内需要关注的提示',
    understandAlertInfo: '了解提示信息',
    understandAlertContent: '了解提示内容',
    understandAlertType: '了解提示类型',
    performAlertOperations: '针对提示进行操作',
  },
  en: {
    title: 'Understand alerts that need attention within pages/modules',
    understandAlertInfo: 'Understand Alert Information',
    understandAlertContent: 'Understand Alert Content',
    understandAlertType: 'Understand Alert Type',
    performAlertOperations: 'Perform Operations on Alerts',
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
            label: locale.understandAlertInfo,
            targetType: 'mvp',
            children: [
              {
                id: '707000085',
                label: locale.understandAlertContent,
                link: 'alert-index-tab-design-demo-content',
              },
              {
                id: '707000086',
                label: locale.understandAlertType,
                link: 'alert-index-tab-design-demo-type',
              },
            ],
          },
          {
            id: '200000005',
            label: locale.performAlertOperations,
            targetType: 'extension',
            link: 'alert-index-tab-design-demo-action',
          },
        ],
      }}
    />
  );
};

export default BehaviorPattern;
