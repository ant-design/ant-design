import React from 'react';
import { mount } from 'enzyme';
import DatePicker from '..';

const { MonthPicker, WeekPicker, RangePicker } = DatePicker;

describe('invalid value or defaultValue', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterAll(() => {
    // eslint-disable-next-line no-console
    console.error.mockRestore();
  });

  it('DatePicker should throw error when value or defaultValue is not moment object', () => {
    expect(() => {
      mount(<DatePicker value={{}} />);
    }).toThrow('The value/defaultValue of DatePicker or MonthPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
    expect(() => {
      mount(<DatePicker defaultValue={{}} />);
    }).toThrow('The value/defaultValue of DatePicker or MonthPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value')
  });

  it('WeekPicker should throw error when value or defaultValue is not moment object', () => {
    expect(() => {
      mount(<WeekPicker value={{}} />);
    }).toThrow('The value/defaultValue of WeekPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
    expect(() => {
      mount(<WeekPicker defaultValue={{}} />);
    }).toThrow('The value/defaultValue of WeekPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
  });

  it('RangePicker should throw error when value or defaultValue is not moment object', () => {
    expect(() => {
      mount(<RangePicker value={[{}, {}]} />);
    }).toThrow('The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, see: https://u.ant.design/date-picker-value');
    expect(() => {
      mount(<RangePicker defaultValue={[{}, {}]} />);
    }).toThrow('The value/defaultValue of RangePicker must be a moment object array after `antd@2.0`, see: https://u.ant.design/date-picker-value')
  });

  it('MonthPicker should throw error when value or defaultValue is not moment object', () => {
    expect(() => {
      mount(<MonthPicker value={{}} />);
    }).toThrow('The value/defaultValue of DatePicker or MonthPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value');
    expect(() => {
      mount(<MonthPicker defaultValue={{}} />);
    }).toThrow('The value/defaultValue of DatePicker or MonthPicker must be a moment object after `antd@2.0`, see: https://u.ant.design/date-picker-value')
  });
});
