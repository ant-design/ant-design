import React from 'react';

import useLocale from '../../../.dumi/hooks/useLocale';
import BehaviorMap from '../../../.dumi/theme/common/BehaviorMap';

const locales = {
  cn: {
    title: '选择（输入）日期数据',
    selectTimePoint: '选择时间点',
    selectDay: '选择某天',
    selectWeek: '选择某周',
    selectMonth: '选择某月',
    selectQuarter: '选择某季度',
    selectYear: '选择某年',
    selectTime: '选择某时间',
    selectTimeRange: '选择时间段',
    selectDayRange: '选择某天至某天',
    selectWeekRange: '选择某周至某周',
    selectMonthRange: '选择某月至某月',
    selectQuarterRange: '选择某季度至某季度',
    selectYearRange: '选择某年至某年',
    selectTimeRangeDetailed: '选择某时间至某时间',
    quickSelectDate: '快捷选择日期数据',
    quickSelectTimePoint: '快捷选择时间点',
    quickSelectTimeRange: '快捷选择时间段',
    viewDateExtraInfo: '查看日期附属信息',
  },
  en: {
    title: 'Select (Input) Date Data',
    selectTimePoint: 'Select Time Point',
    selectDay: 'Select a Day',
    selectWeek: 'Select a Week',
    selectMonth: 'Select a Month',
    selectQuarter: 'Select a Quarter',
    selectYear: 'Select a Year',
    selectTime: 'Select a Time',
    selectTimeRange: 'Select Time Range',
    selectDayRange: 'Select from Day to Day',
    selectWeekRange: 'Select from Week to Week',
    selectMonthRange: 'Select from Month to Month',
    selectQuarterRange: 'Select from Quarter to Quarter',
    selectYearRange: 'Select from Year to Year',
    selectTimeRangeDetailed: 'Select from Time to Time',
    quickSelectDate: 'Quick Select Date Data',
    quickSelectTimePoint: 'Quick Select Time Point',
    quickSelectTimeRange: 'Quick Select Time Range',
    viewDateExtraInfo: 'View Date Additional Information',
  },
};

const BehaviorPattern: React.FC = () => {
  const [locale, localeType] = useLocale(locales);
  const anchorType = localeType === 'cn' ? 'zh-cn' : 'en-us';
  return (
    <BehaviorMap
      data={{
        id: '200000004',
        label: locale.title,
        children: [
          {
            id: '500000061',
            label: locale.selectTimePoint,
            targetType: 'mvp',
            children: [
              {
                id: '707000085',
                label: locale.selectDay,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-date`,
              },
              {
                id: '707000086',
                label: locale.selectWeek,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-week`,
              },
              {
                id: '707000087',
                label: locale.selectMonth,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-month`,
              },
              {
                id: '707000088',
                label: locale.selectQuarter,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-quarter`,
              },
              {
                id: '707000089',
                label: locale.selectYear,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-year`,
              },
              {
                id: '707000090',
                label: locale.selectTime,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-time`,
              },
            ],
          },
          {
            id: '200000005',
            label: locale.selectTimeRange,
            targetType: 'mvp',
            children: [
              {
                id: '7070000851',
                label: locale.selectDayRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-date-range`,
              },
              {
                id: '7070000861',
                label: locale.selectWeekRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-week-range`,
              },
              {
                id: '7070000871',
                label: locale.selectMonthRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-month-range`,
              },
              {
                id: '7070000881',
                label: locale.selectQuarterRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-quarter-range`,
              },
              {
                id: '7070000891',
                label: locale.selectYearRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-year-range`,
              },
              {
                id: '7070000901',
                label: locale.selectTimeRangeDetailed,
                link: `date-picker-index-tab-design-${anchorType}-demo-pick-time-range`,
              },
            ],
          },
          {
            id: '200000006',
            label: locale.quickSelectDate,
            targetType: 'extension',
            children: [
              {
                id: '70700008912',
                label: locale.quickSelectTimePoint,
                link: `date-picker-index-tab-design-${anchorType}-demo-preset-time`,
              },
              {
                id: '70700009012',
                label: locale.quickSelectTimeRange,
                link: `date-picker-index-tab-design-${anchorType}-demo-preset-range`,
              },
            ],
          },
          {
            id: '200000007',
            label: locale.viewDateExtraInfo,
            targetType: 'extension',
            link: `date-picker-index-tab-design-${anchorType}-demo-date-extra-info`,
          },
        ],
      }}
    />
  );
};

export default BehaviorPattern;
