import type { TriggerProps } from '@rc-component/trigger';
import dayjs from 'dayjs';

import 'dayjs/locale/mk'; // to test local in 'prop locale should works' test case

import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import MockDate from 'mockdate';
import dayJsGenerateConfig from 'rc-picker/lib/generate/dayjs';

import DatePicker from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import { fireEvent, render } from '../../../tests/utils';
import type { PickerLocale } from '../generatePicker';
import { getClearButton } from './utils';

dayjs.extend(customParseFormat);

let triggerProps: TriggerProps;

jest.mock('@rc-component/trigger', () => {
  let Trigger = jest.requireActual('@rc-component/trigger/lib/mock');
  Trigger = Trigger.default || Trigger;
  const h: typeof React = jest.requireActual('react');

  return {
    default: h.forwardRef<HTMLElement, TriggerProps>((props, ref) => {
      triggerProps = props;
      return h.createElement(Trigger, { ref, ...props });
    }),
    __esModule: true,
  };
});

function getCell(text: string) {
  const cells = Array.from(document.querySelectorAll('.ant-picker-cell'));

  return cells.find((cell) => cell.textContent === text);
}

describe('DatePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  focusTest(DatePicker, { refFocus: true });

  beforeEach(() => {
    MockDate.set(dayjs('2016-11-22').valueOf());
  });

  afterEach(() => {
    MockDate.reset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('prop locale should works', () => {
    const locale = {
      lang: {
        locale: 'mk',
        placeholder: 'Избери дата',
        rangePlaceholder: ['Начална дата', 'Крайна дата'],
        today: 'Днес',
        now: 'Сега',
        backToToday: 'Към днес',
        ok: 'Добре',
        clear: 'Изчистване',
        month: 'Месец',
        year: 'Година',
        timeSelect: 'Избор на час',
        dateSelect: 'Избор на дата',
        monthSelect: 'Избор на месец',
        yearSelect: 'Избор на година',
        decadeSelect: 'Десетилетие',
        previousMonth: 'Предишен месец (PageUp)',
        nextMonth: 'Следващ месец (PageDown)',
        previousYear: 'Последна година (Control + left)',
        nextYear: 'Следваща година (Control + right)',
        previousDecade: 'Предишно десетилетие',
        nextDecade: 'Следващо десетилетие',
        previousCentury: 'Последен век',
        nextCentury: 'Следващ век',
        yearFormat: 'YYYY',
        dateFormat: 'D M YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'D M YYYY HH:mm:ss',
        monthBeforeYear: true,
      },
      timePickerLocale: {
        placeholder: 'Избор на час',
      },
    };
    const birthday = dayjs('2000-01-01', 'YYYY-MM-DD');
    const wrapper = render(<DatePicker open locale={locale as PickerLocale} value={birthday} />);
    expect(Array.from(wrapper.container.children)).toMatchSnapshot();
  });

  it('disabled date', () => {
    const disabledDate = (current: any) => current && current < dayjs().endOf('day');
    render(<DatePicker disabledDate={disabledDate} open />);

    expect(getCell('21')).toHaveClass('ant-picker-cell-disabled');
    expect(getCell('23')).not.toHaveClass('ant-picker-cell-disabled');
  });

  it('placeholder', () => {
    const wrapper = render(<DatePicker placeholder={undefined} />);
    expect(wrapper.container.querySelector('input')?.placeholder).toEqual('Select date');
  });

  it('showTime={{ showHour: true, showMinute: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showHour: true, showMinute: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showMinute: true, showSecond: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showMinute: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showHour: true, showMinute: true, showSecond: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showHour: true, showMinute: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(3);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[2]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showHour: true, showSecond: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showHour: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showSecond: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(1);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showMinute: true }}', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime={{ showMinute: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(1);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('showTime={{ showHour: true }}', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} showTime={{ showHour: true }} format="YYYY-MM-DD" open />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(1);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
  });

  it('showTime={{ }} (no true args)', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} showTime={{}} format="YYYY-MM-DD" open />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column')).toHaveLength(3);
  });

  it('showTime should work correctly when format is custom function', () => {
    const { container } = render(
      <DatePicker
        defaultValue={dayjs()}
        showTime
        format={(val) => val.format('YYYY-MM-DD')}
        open
      />,
    );
    const focusEvent = () => {
      fireEvent.focus(container.querySelector('input')!);
    };
    const mouseDownEvent = () => {
      fireEvent.mouseDown(container.querySelector('input')!);
    };
    expect(focusEvent).not.toThrow();
    expect(mouseDownEvent).not.toThrow();
  });

  it('showTime should work correctly when format is Array', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} showTime format={['YYYY-MM-DD HH:mm']} open />,
    );
    const fuousEvent = () => {
      fireEvent.focus(container.querySelector('input')!);
    };
    const mouseDownEvent = () => {
      fireEvent.mouseDown(container.querySelector('input')!);
    };
    expect(fuousEvent).not.toThrow();
    expect(mouseDownEvent).not.toThrow();
  });

  it('12 hours', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} showTime format="YYYY-MM-DD HH:mm:ss A" open />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(4);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(12);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[2]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[3]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(2);
  });

  it('24 hours', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} showTime format="YYYY-MM-DD HH:mm:ss" open />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column').length).toBe(3);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[2]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('DatePicker.RangePicker with defaultValue and showTime', () => {
    const startDate = dayjs('1982-02-12');
    const endDate = dayjs('1982-02-22');

    const { container } = render(
      <DatePicker.RangePicker defaultValue={[startDate, endDate]} showTime open />,
    );

    const m = container.querySelector('.ant-picker-header-view .ant-picker-month-btn')?.innerHTML;
    const y = container.querySelector('.ant-picker-header-view .ant-picker-year-btn')?.innerHTML;
    expect(m).toBe(startDate.format('MMM'));
    expect(y).toBe(startDate.format('YYYY'));
    expect(container.querySelectorAll('.ant-picker-time-panel').length).toBe(1);
  });

  it('DatePicker placement api work correctly', () => {
    const { rerender } = render(<DatePicker open placement="topLeft" />);
    expect(triggerProps?.popupPlacement).toEqual('topLeft');
    rerender(<DatePicker open placement="topRight" />);
    expect(triggerProps?.popupPlacement).toEqual('topRight');
    rerender(<DatePicker open placement="bottomLeft" />);
    expect(triggerProps?.popupPlacement).toEqual('bottomLeft');
    rerender(<DatePicker open placement="bottomRight" />);
    expect(triggerProps?.popupPlacement).toEqual('bottomRight');
  });

  it('RangePicker placement api work correctly', () => {
    const { rerender } = render(<DatePicker.RangePicker open placement="topLeft" />);
    expect(triggerProps?.builtinPlacements).toEqual(
      expect.objectContaining({
        topLeft: expect.objectContaining({ offset: [0, -4], points: ['bl', 'tl'] }),
      }),
    );
    expect(triggerProps?.popupPlacement).toEqual('topLeft');

    rerender(<DatePicker.RangePicker open placement="topRight" />);
    expect(triggerProps?.builtinPlacements).toEqual(
      expect.objectContaining({
        topRight: expect.objectContaining({ offset: [0, -4], points: ['br', 'tr'] }),
      }),
    );
    expect(triggerProps?.popupPlacement).toEqual('topRight');

    rerender(<DatePicker.RangePicker open placement="bottomLeft" />);
    expect(triggerProps?.builtinPlacements).toEqual(
      expect.objectContaining({
        bottomLeft: expect.objectContaining({ offset: [0, 4], points: ['tl', 'bl'] }),
      }),
    );
    expect(triggerProps?.popupPlacement).toEqual('bottomLeft');

    rerender(<DatePicker.RangePicker open placement="bottomRight" />);
    expect(triggerProps?.builtinPlacements).toEqual(
      expect.objectContaining({
        bottomRight: expect.objectContaining({ offset: [0, 4], points: ['tr', 'br'] }),
      }),
    );
    expect(triggerProps?.popupPlacement).toEqual('bottomRight');
  });

  it('legacy dropdownClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(<DatePicker dropdownClassName="legacy" open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: DatePicker] `dropdownClassName` is deprecated. Please use `popupClassName` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('support DatePicker.generatePicker', () => {
    const MyDatePicker = DatePicker.generatePicker(dayJsGenerateConfig);
    const { container } = render(<MyDatePicker />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('kk:mm format', () => {
    const { container } = render(
      <DatePicker defaultValue={dayjs()} format="kk:mm" showTime open />,
    );
    expect(container.querySelectorAll('.ant-picker-time-panel-column')).toHaveLength(2);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[0]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(24);
    expect(
      container
        .querySelectorAll('.ant-picker-time-panel-column')?.[1]
        .querySelectorAll('.ant-picker-time-panel-cell').length,
    ).toBe(60);
  });

  it('allows or prohibits clearing as applicable', async () => {
    const somePoint = dayjs('2023-08-01');
    const { rerender, container } = render(<DatePicker value={somePoint} />);
    expect(getClearButton()).toBeTruthy();

    rerender(<DatePicker value={somePoint} allowClear={false} />);
    expect(getClearButton()).toBeFalsy();

    rerender(<DatePicker value={somePoint} allowClear={{ clearIcon: <CloseCircleFilled /> }} />);
    expect(getClearButton()).toBeTruthy();

    rerender(
      <DatePicker
        value={somePoint}
        allowClear={{ clearIcon: <div data-testid="custom-clear" /> }}
      />,
    );
    expect(getClearButton()).toBeTruthy();
    expect(container.querySelector('[data-testid="custom-clear"]')).toBeTruthy();

    rerender(<DatePicker value={somePoint} allowClear={{}} />);
    expect(getClearButton()).toBeTruthy();
  });
});
