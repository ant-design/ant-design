import React from 'react';
import dayjs from 'dayjs';

import DatePicker from '..';
import { fireEvent, render } from '../../../tests/utils';
import Calendar from '../../calendar';
import ConfigProvider from '../../config-provider';
import hyAM from '../../locale/hy_AM';
import zhCN from '../../locale/zh_CN';
import frFR from '../locale/fr_FR';
import plPL from '../locale/pl_PL';

describe('DatePicker locale without application Day.js locale imports', () => {
  const value = dayjs('2026-08-24');

  it('localizes the month and weekdays using ConfigProvider', () => {
    const { baseElement } = render(
      <ConfigProvider locale={zhCN}>
        <DatePicker open value={value} />
      </ConfigProvider>,
    );

    expect(baseElement.querySelector('.ant-picker-year-btn')).toHaveTextContent('2026年');
    expect(baseElement.querySelector('.ant-picker-now-btn')).toHaveTextContent('今天');
    expect(baseElement.querySelector('.ant-picker-month-btn')).toHaveTextContent('8月');
    expect(
      Array.from(baseElement.querySelectorAll('thead th'), (cell) => cell.textContent),
    ).toEqual(['一', '二', '三', '四', '五', '六', '日']);

    fireEvent.click(baseElement.querySelector('.ant-picker-month-btn')!);
    expect(baseElement.querySelector('[title="2026-08"]')).toHaveTextContent('8月');
  });

  it('uses a DatePicker locale in preference to ConfigProvider', () => {
    const { baseElement } = render(
      <ConfigProvider locale={zhCN}>
        <DatePicker open value={value} locale={frFR} />
      </ConfigProvider>,
    );

    expect(baseElement.querySelector('.ant-picker-now-btn')).toHaveTextContent("Aujourd'hui");
    expect(baseElement.querySelector('.ant-picker-month-btn')).toHaveTextContent('août');
    expect(
      Array.from(baseElement.querySelectorAll('thead th'), (cell) => cell.textContent),
    ).toEqual(['lu', 'ma', 'me', 'je', 've', 'sa', 'di']);
  });

  it('preserves full month formatting in the header and month choices', () => {
    const { baseElement } = render(<DatePicker open value={value} locale={plPL} />);

    expect(baseElement.querySelector('.ant-picker-month-btn')).toHaveTextContent('sierpień');

    fireEvent.click(baseElement.querySelector('.ant-picker-month-btn')!);
    expect(baseElement.querySelector('[title="2026-08"]')).toHaveTextContent('sierpień');
  });

  it('localizes an inline ConfigProvider DatePicker locale', () => {
    const { baseElement } = render(
      <ConfigProvider locale={hyAM}>
        <DatePicker open value={value} />
      </ConfigProvider>,
    );

    expect(baseElement.querySelector('.ant-picker-month-btn')).toHaveTextContent('օգս');
    expect(
      Array.from(baseElement.querySelectorAll('thead th'), (cell) => cell.textContent),
    ).toEqual(['երկ', 'երք', 'չրք', 'հնգ', 'ուրբ', 'շբթ', 'կրկ']);
  });

  it('also localizes Calendar month and weekday labels', () => {
    const { container } = render(
      <ConfigProvider locale={zhCN}>
        <Calendar value={value} fullscreen={false} />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-picker-calendar-month-select')).toHaveTextContent('8月');
    expect(Array.from(container.querySelectorAll('thead th'), (cell) => cell.textContent)).toEqual([
      '一',
      '二',
      '三',
      '四',
      '五',
      '六',
      '日',
    ]);
  });

  it('keeps the default locale when other locale packages are imported', () => {
    const { baseElement } = render(<DatePicker open value={value} />);

    expect(baseElement.querySelector('.ant-picker-month-btn')).toHaveTextContent('Aug');
    expect(
      Array.from(baseElement.querySelectorAll('thead th'), (cell) => cell.textContent),
    ).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    expect(dayjs.locale()).toBe('en');
  });
});
