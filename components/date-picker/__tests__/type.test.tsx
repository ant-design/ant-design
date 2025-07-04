import * as React from 'react';

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
});
