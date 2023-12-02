import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React from 'react';
import DatePicker from '..';
import ConfigProvider from '../../config-provider';
import type { Locale } from '../../locale';
import locale from '../../locale/zh_CN';
import jaJP from '../../locale/ja_JP';
import zhTW from '../locale/zh_TW';
import { render } from '../../../tests/utils';

dayjs.extend(customParseFormat);

const { MonthPicker, WeekPicker } = DatePicker;

describe('Picker format by locale', () => {
  const myLocale = {
    ...locale,
    DatePicker: {
      ...locale.DatePicker,
      dateFormat: 'YYYY 年 M 月 D 日',
      dateTimeFormat: 'YYYY 年 M 月 D 日 H 时 m 分 s 秒',
      weekFormat: 'YYYY 年 W 周',
      monthFormat: 'YYYY 年 M 月',
    },
  };

  const date = dayjs('2000-01-01', 'YYYY-MM-DD');
  function matchPicker(name: string, Picker: typeof MonthPicker | typeof WeekPicker, props?: any) {
    it(name, () => {
      const { container } = render(
        <ConfigProvider locale={myLocale as Locale}>
          <Picker value={date} {...props} />
        </ConfigProvider>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });
  }

  matchPicker('date', DatePicker);
  matchPicker('dateTime', DatePicker, { showTime: true });
  matchPicker('week', WeekPicker);
  matchPicker('month', MonthPicker);
});

describe('MonthPicker and WeekPicker', () => {
  it('render MonthPicker', () => {
    const birthday = dayjs('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const { container } = render(<MonthPicker open value={birthday} />);
    expect(container.querySelector('div.ant-picker-dropdown')?.parentNode).toMatchSnapshot();
  });

  it('render WeekPicker', () => {
    const birthday = dayjs('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const { container } = render(<WeekPicker open value={birthday} />);
    expect(container.querySelector('div.ant-picker-dropdown')?.parentNode).toMatchSnapshot();
  });
});

describe('Override locale setting of the ConfigProvider', () => {
  it('DatePicker', () => {
    const { container } = render(
      <ConfigProvider locale={jaJP}>
        <DatePicker locale={zhTW} />
      </ConfigProvider>,
    );
    expect(container.querySelector('input')?.placeholder).toEqual('請選擇日期');
  });
  it('RangePicker', () => {
    const { container } = render(
      <ConfigProvider locale={jaJP}>
        <DatePicker.RangePicker locale={zhTW} />
      </ConfigProvider>,
    );
    expect(container.querySelectorAll('input')[0]?.placeholder).toEqual('開始日期');
    expect(container.querySelectorAll('input')[1]?.placeholder).toEqual('結束日期');
  });
});
