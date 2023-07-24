import React from 'react';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const BehaviorPattern = () => (
  <BehaviorMap
    data={{
      id: '200000004',
      label: '选择（输入）日期数据',
      children: [
        {
          id: '500000061',
          label: '选择时间点',
          targetType: 'mvp',
          children: [
            {
              id: '707000085',
              label: '选择某天',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-date',
            },
            {
              id: '707000086',
              label: '选择某周',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-week',
            },
            {
              id: '707000087',
              label: '选择某月',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-month',
            },
            {
              id: '707000088',
              label: '选择某季度',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-quarter',
            },
            {
              id: '707000089',
              label: '选择某年',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-year',
            },
            {
              id: '707000090',
              label: '选择某时间',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-time',
            },
          ],
        },
        {
          id: '200000005',
          label: '选择时间段',
          targetType: 'mvp',
          children: [
            {
              id: '7070000851',
              label: '选择某天至某天',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-date-range',
            },
            {
              id: '7070000861',
              label: '选择某周至某周',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-week-range',
            },
            {
              id: '7070000871',
              label: '选择某月至某月',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-month-range',
            },
            {
              id: '7070000881',
              label: '选择某季度至某季度',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-quarter-range',
            },
            {
              id: '7070000891',
              label: '选择某年至某年',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-year-range',
            },
            {
              id: '7070000901',
              label: '选择某时间至某时间',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-pick-time-range',
            },
          ],
        },
        {
          id: '200000006',
          label: '快捷选择日期数据',
          targetType: 'extension',
          children: [
            {
              id: '70700008912',
              label: '快捷选择时间点',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-preset-time',
            },
            {
              id: '70700009012',
              label: '快捷选择时间段',
              link: 'components-date-picker-index-tab-design-zh-cn-demo-preset-range',
            },
          ],
        },
        {
          id: '200000007',
          label: '查看日期附属信息',
          targetType: 'extension',
          link: 'components-date-picker-index-tab-design-zh-cn-demo-date-extra-info',
        },
      ],
    }}
  />
);

export default BehaviorPattern;
