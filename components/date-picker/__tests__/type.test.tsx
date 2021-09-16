import * as React from 'react';
import DatePicker from '..';

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
