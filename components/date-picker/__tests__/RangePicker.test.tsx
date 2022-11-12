import moment from 'moment';
import type { RangeValue } from 'rc-picker/lib/interface';
import React from 'react';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import { render, resetMockDate, setMockDate } from '../../../tests/utils';
import enUS from '../locale/en_US';

import { closePicker, openPicker, selectCell } from './utils';

const { RangePicker } = DatePicker;

describe('RangePicker', () => {
  focusTest(RangePicker, { refFocus: true, blurDelay: 110 });

  beforeEach(() => {
    setMockDate();
  });

  afterEach(() => {
    resetMockDate();
  });

  // issue: https://github.com/ant-design/ant-design/issues/5872
  it('should not throw error when value is reset to `[]`', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper1 = render(<RangePicker value={[birthday, birthday]} open />);
    const wrapper2 = render(<RangePicker value={[] as unknown as null} open />);

    expect(() => {
      openPicker(wrapper1);
      selectCell(wrapper1, 3);
      closePicker(wrapper1);

      openPicker(wrapper1, 1);
      selectCell(wrapper1, 5, 1);
      closePicker(wrapper1, 1);

      openPicker(wrapper2);
      selectCell(wrapper2, 3);
      closePicker(wrapper2);

      openPicker(wrapper2, 1);
      selectCell(wrapper2, 5, 1);
      closePicker(wrapper2, 1);
    }).not.toThrow();
  });

  it('customize separator', () => {
    const { container } = render(<RangePicker separator="test" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13302
  describe('in "month" mode, when the left and right panels select the same month', () => {
    it('the cell status is correct', () => {
      let rangePickerValue = [] as unknown as RangeValue<any>;
      class Test extends React.Component {
        state = { value: null };

        render() {
          return (
            <RangePicker
              value={this.state.value}
              mode={['month', 'month']}
              onPanelChange={value => {
                this.setState({ value });
                rangePickerValue = value;
              }}
            />
          );
        }
      }
      const wrapper = render(<Test />);

      openPicker(wrapper);
      selectCell(wrapper, 'Feb');
      openPicker(wrapper, 1);
      selectCell(wrapper, 'Feb');
      closePicker(wrapper, 1);

      const [start, end] = rangePickerValue as [moment.Moment, moment.Moment];

      expect(start.isSame(end, 'date')).toBeTruthy();
    });
  });

  describe('ranges', () => {
    it('RangePicker support presetted ranges with Tags', () => {
      const { container } = render(
        <RangePicker
          open
          ranges={{
            Today: [moment(), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
          }}
        />,
      );
      expect(Array.from(container.children)).toMatchSnapshot();
    });
  });

  it('placeholder', () => {
    const { container } = render(<RangePicker placeholder={undefined} />);
    const inputLists = container.querySelectorAll('input');
    expect(inputLists[0]?.placeholder).toEqual('Start date');
    expect(inputLists[inputLists.length - 1].placeholder).toEqual('End date');
  });

  it('RangePicker picker quarter placeholder', () => {
    const { container } = render(<RangePicker picker="quarter" locale={enUS} />);
    expect(container.querySelectorAll('input')[0]?.placeholder).toEqual('Start quarter');
    expect(container.querySelectorAll('input')[1]?.placeholder).toEqual('End quarter');
  });
});
