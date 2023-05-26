import Dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import MockDate from 'mockdate';
import { resetWarned } from 'rc-util/lib/warning';
import React from 'react';
import Calendar from '..';
import { fireEvent, render, waitFakeTimer } from '../../../tests/utils';

describe('Calendar.onSelect', () => {
  beforeAll(() => {
    MockDate.set(Dayjs('2000-01-01').valueOf());
  });

  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('source of year select', async () => {
    const onSelect = jest.fn();
    const { container } = render(<Calendar onSelect={onSelect} />);

    fireEvent.mouseDown(container.querySelector('.ant-select-selector')!);
    await waitFakeTimer();

    fireEvent.click(container.querySelector('.ant-select-item-option')!);
    await waitFakeTimer();

    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'year' });
  });

  it('source of month select', async () => {
    const onSelect = jest.fn();
    const { container } = render(<Calendar onSelect={onSelect} />);

    fireEvent.mouseDown(container.querySelectorAll('.ant-select-selector')[1]!);
    await waitFakeTimer();

    fireEvent.click(container.querySelector('.ant-select-item-option')!);
    await waitFakeTimer();

    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'month' });
  });

  it('source of customize', async () => {
    const onSelect = jest.fn();
    const { container } = render(
      <Calendar
        onSelect={onSelect}
        headerRender={({ onChange }) => (
          <button
            className="bamboo"
            type="button"
            onClick={() => {
              onChange(Dayjs('1999-01-01'));
            }}
          >
            Trigger
          </button>
        )}
      />,
    );

    fireEvent.click(container.querySelector('.bamboo')!);
    await waitFakeTimer();

    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'customize' });
  });

  it('source of date', () => {
    const onSelect = jest.fn();
    const { container } = render(<Calendar onSelect={onSelect} />);

    fireEvent.click(container.querySelector('.ant-picker-cell')!);
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'date' });
  });

  it('source of date with month panel', async () => {
    const onSelect = jest.fn();
    const onPanelChange = jest.fn();
    const { container } = render(<Calendar onSelect={onSelect} onPanelChange={onPanelChange} />);

    // Default is month radio
    fireEvent.click(container.querySelector('.ant-picker-cell')!);
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'date' });

    // Click year radio
    fireEvent.click(container.querySelectorAll('.ant-radio-button-input')[1]!);
    expect(onPanelChange).toHaveBeenCalledWith(expect.anything(), 'year');

    fireEvent.click(container.querySelector('.ant-picker-cell')!);
    expect(onSelect).toHaveBeenCalledWith(expect.anything(), { source: 'month' });
  });
});
