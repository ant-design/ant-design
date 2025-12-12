import * as React from 'react';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

import DatePicker from '..';

describe('DatePicker.typescript', () => {
  it('DatePicker ref methods', () => {
    const datePicker = (
      <DatePicker
        ref={(picker) => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(datePicker).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/33417
  it('DatePicker ref methods with forwardRef', () => {
    const datePicker = (
      <DatePicker
        ref={(picker) => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(datePicker).toBeTruthy();
  });

  it('RangePicker ref methods', () => {
    const rangePicker = (
      <DatePicker.RangePicker
        ref={(picker) => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(rangePicker).toBeTruthy();
  });

  it('RangePicker ref methods with forwardRef', () => {
    const datePicker = (
      <DatePicker.RangePicker
        ref={(picker) => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(datePicker).toBeTruthy();
  });

  it('DatePicker and RangePicker supports popupClassName', () => {
    const datePicker = <DatePicker popupClassName="popupClassName" />;
    expect(datePicker).toBeTruthy();
    const rangePicker = <DatePicker.RangePicker popupClassName="popupClassName" />;
    expect(rangePicker).toBeTruthy();
  });

  it('DatePicker should accept only single value if multiple is false', () => {
    const mockSingleValue = dayjs();
    const mockOnChange = jest.fn<void, [Dayjs | null, string | null]>();
    const mockOnOk = jest.fn<void, [Dayjs | null]>();

    const datePicker = (
      <DatePicker
        defaultValue={mockSingleValue}
        value={mockSingleValue}
        onChange={mockOnChange}
        onOk={mockOnOk}
      />
    );

    expect(datePicker).toBeTruthy();
  });

  it('DatePicker should accept only array value if multiple is true', () => {
    const mockMultiValue = [dayjs()];
    const mockOnChange = jest.fn<void, [Dayjs[] | null, string[] | null]>();
    const mockOnOk = jest.fn<void, [Dayjs[] | null]>();

    const datePicker = (
      <DatePicker
        multiple
        defaultValue={mockMultiValue}
        value={mockMultiValue}
        onChange={mockOnChange}
        onOk={mockOnOk}
      />
    );

    expect(datePicker).toBeTruthy();
  });
});
