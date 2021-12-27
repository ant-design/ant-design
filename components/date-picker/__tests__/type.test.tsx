import * as React from 'react';
import DatePicker from '..';
import type { DatePickerProps } from '..';

describe('DatePicker.typescript', () => {
  it('DatePicker ref methods', () => {
    const datePicker = (
      <DatePicker
        ref={picker => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(datePicker).toBeTruthy();
  });


  // https://github.com/ant-design/ant-design/issues/33417
  it('DatePicker ref methods with forwardRef', () => {
    const MyDatePicker = React.forwardRef<typeof DatePicker, DatePickerProps>((props, ref) => (
      <DatePicker
        {...props}
        ref={ref}
      />
    ));
    const datePicker = (
      <MyDatePicker
        ref={picker => {
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
        ref={picker => {
          picker?.focus();
          picker?.blur();
        }}
      />
    );
    expect(rangePicker).toBeTruthy();
  });
});
