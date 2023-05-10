import Dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { type PickerPanelProps } from 'rc-picker';
import React from 'react';
import Calendar from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { fireEvent, render } from '../../../tests/utils';
import { type CalendarHeaderProps } from '../Header';

const ref: {
  calendarProps?: PickerPanelProps<unknown>;
  calendarHeaderProps?: CalendarHeaderProps<unknown>;
} = {};

jest.mock('../Header', () => {
  const HeaderModule = jest.requireActual('../Header');
  const HeaderComponent = HeaderModule.default;
  return (props: CalendarHeaderProps<any>) => {
    ref.calendarHeaderProps = props;
    return <HeaderComponent {...props} />;
  };
});

jest.mock('rc-picker', () => {
  const RcPicker = jest.requireActual('rc-picker');
  const PickerPanelComponent = RcPicker.PickerPanel;
  return {
    ...RcPicker,
    PickerPanel: (props: PickerPanelProps<unknown>) => {
      ref.calendarProps = props;
      return <PickerPanelComponent {...props} />;
    },
  };
});

describe('Calendar', () => {
  mountTest(Calendar);
  rtlTest(Calendar, true);

  function openSelect(wrapper: HTMLElement, className: string) {
    fireEvent.mouseDown(wrapper.querySelector(className)!.querySelector('.ant-select-selector')!);
  }

  it('only month change should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar onSelect={onSelect} defaultValue={Dayjs('2018-02-02')} selectable={['month']} />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['month']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    wrapper.rerender(<Calendar onSelect={onSelect} mode='month' selectable={['month']} />);

    openSelect(wrapper.container, '.ant-picker-calendar-month-select');
    fireEvent.click(
      Array.from(wrapper.container.querySelectorAll('.ant-select-item-option')).at(5)!,
    );
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('only year change should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar onSelect={onSelect} defaultValue={Dayjs('2018-02-02')} selectable={['year']} />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['year']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);
  });

  it('only date select should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar onSelect={onSelect} defaultValue={Dayjs('2018-02-02')} selectable={['date']} />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['date']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    wrapper.rerender(<Calendar onSelect={onSelect} mode='month' selectable={['date']} />);

    openSelect(wrapper.container, '.ant-picker-calendar-month-select');
    fireEvent.click(
      Array.from(wrapper.container.querySelectorAll('.ant-select-item-option')).at(5)!,
    );
    expect(onSelect).toHaveBeenCalledTimes(0);
  });

  it('only date select and month change should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        selectable={['date', 'month']}
      />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['date', 'month']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    wrapper.rerender(<Calendar onSelect={onSelect} mode='month' selectable={['date', 'month']} />);

    openSelect(wrapper.container, '.ant-picker-calendar-month-select');
    fireEvent.click(
      Array.from(wrapper.container.querySelectorAll('.ant-select-item-option')).at(5)!,
    );
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('only date select and year change should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        selectable={['date', 'year']}
      />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['date', 'year']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    wrapper.rerender(<Calendar onSelect={onSelect} mode='month' selectable={['date', 'year']} />);

    openSelect(wrapper.container, '.ant-picker-calendar-month-select');
    fireEvent.click(
      Array.from(wrapper.container.querySelectorAll('.ant-select-item-option')).at(5)!,
    );
    expect(onSelect).toHaveBeenCalledTimes(0);
  });

  it('only month chnage and year change should trigger onSelect callback', () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        selectable={['month', 'year']}
      />,
    );

    fireEvent.click(container.querySelector('[title="2018-02-05"]')!);
    fireEvent.click(container.querySelector('[title="2018-02-07"]')!);
    expect(onSelect).toHaveBeenCalledTimes(0);

    onSelect.mockReset();

    openSelect(container, '.ant-picker-calendar-year-select');
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(2)!);
    fireEvent.click(Array.from(container.querySelectorAll('.ant-select-item-option')).at(4)!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    const wrapper = render(
      <Calendar
        onSelect={onSelect}
        defaultValue={Dayjs('2018-02-02')}
        mode="year"
        selectable={['month', 'year']}
      />,
    );

    fireEvent.click(wrapper.container.querySelector('[title="2018-01"]')!);
    fireEvent.click(wrapper.container.querySelector('[title="2018-03"]')!);
    expect(onSelect).toHaveBeenCalledTimes(2);

    onSelect.mockReset();

    wrapper.rerender(<Calendar onSelect={onSelect} mode='month' selectable={['month', 'year']} />);

    openSelect(wrapper.container, '.ant-picker-calendar-month-select');
    fireEvent.click(
      Array.from(wrapper.container.querySelectorAll('.ant-select-item-option')).at(5)!,
    );
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
