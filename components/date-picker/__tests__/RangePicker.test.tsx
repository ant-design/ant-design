import React, { useState } from 'react';
import { CloseCircleFilled } from '@ant-design/icons';
import { warning } from '@rc-component/util';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import { render, resetMockDate, setMockDate } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import enUS from '../locale/en_US';
import { closePicker, getClearButton, openPicker, selectCell } from './utils';

const { resetWarned } = warning;

dayjs.extend(customParseFormat);

type RangeValue<DateType extends object> =
  | [DateType | undefined | null, DateType | undefined | null]
  | null;

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
    const birthday = dayjs('2000-01-01', 'YYYY-MM-DD');
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

  it('the left selection is before the right selection', () => {
    let rangePickerValue: dayjs.Dayjs[] = [];
    const Test: React.FC = () => {
      const [value, setValue] = useState<RangeValue<dayjs.Dayjs>>(null);
      return (
        <RangePicker
          value={value}
          mode={['month', 'month']}
          onPanelChange={(v) => {
            setValue(v);
            rangePickerValue = v as dayjs.Dayjs[];
          }}
        />
      );
    };

    const wrapper = render(<Test />);

    openPicker(wrapper);
    selectCell(wrapper, 'Feb');
    openPicker(wrapper, 1);
    selectCell(wrapper, 'May');
    closePicker(wrapper, 1);

    const [start, end] = rangePickerValue;

    expect(start.isBefore(end, 'date')).toBeTruthy();
  });

  // https://github.com/ant-design/ant-design/issues/13302
  describe('in "month" mode, when the left and right panels select the same month', () => {
    it('the cell status is correct', () => {
      let rangePickerValue: dayjs.Dayjs[] = [];
      const Test: React.FC = () => {
        const [value, setValue] = useState<RangeValue<dayjs.Dayjs>>(null!);
        return (
          <RangePicker
            value={value}
            mode={['month', 'month']}
            onPanelChange={(v) => {
              setValue(v);
              rangePickerValue = v as dayjs.Dayjs[];
            }}
          />
        );
      };

      const wrapper = render(<Test />);

      openPicker(wrapper);
      selectCell(wrapper, 'Feb');
      openPicker(wrapper, 1);
      selectCell(wrapper, 'Feb');
      closePicker(wrapper, 1);

      const [start, end] = rangePickerValue;

      expect(start.isSame(end, 'date')).toBeTruthy();
    });
  });

  describe('ranges', () => {
    it('RangePicker support preset ranges with Tags', () => {
      const { container } = render(
        <RangePicker
          open
          ranges={{
            Today: [dayjs(), dayjs()],
            'This Month': [dayjs().startOf('month'), dayjs().endOf('month')],
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

  it('legacy dropdownClassName & popupClassName', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container, rerender } = render(
      <DatePicker.RangePicker dropdownClassName="legacy" open />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: DatePicker.RangePicker] `dropdownClassName` is deprecated. Please use `classNames.popup.root` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    rerender(<DatePicker.RangePicker popupClassName="legacy" open />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: DatePicker.RangePicker] `popupClassName` is deprecated. Please use `classNames.popup.root` instead.',
    );
    expect(container.querySelector('.legacy')).toBeTruthy();

    errSpy.mockRestore();
  });

  it('legacy popupStyle', () => {
    resetWarned();

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { container } = render(
      <DatePicker.RangePicker popupStyle={{ backgroundColor: 'red' }} open />,
    );
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: DatePicker.RangePicker] `popupStyle` is deprecated. Please use `styles.popup.root` instead.',
    );
    expect(container.querySelector('.ant-picker-dropdown')).toHaveStyle(
      'background-color: rgb(255, 0, 0)',
    );

    errSpy.mockRestore();
  });

  it('allows or prohibits clearing as applicable', async () => {
    const somePoint = dayjs('2023-08-01');
    const { rerender, container } = render(
      <RangePicker locale={enUS} value={[somePoint, somePoint]} />,
    );
    expect(getClearButton()).toBeTruthy();

    rerender(<RangePicker locale={enUS} value={[somePoint, somePoint]} allowClear={false} />);
    expect(getClearButton()).toBeFalsy();

    rerender(
      <RangePicker
        locale={enUS}
        value={[somePoint, somePoint]}
        allowClear={{ clearIcon: <CloseCircleFilled /> }}
      />,
    );
    expect(getClearButton()).toBeTruthy();

    rerender(
      <RangePicker
        locale={enUS}
        value={[somePoint, somePoint]}
        allowClear={{ clearIcon: <div data-testid="custom-clear" /> }}
      />,
    );
    expect(getClearButton()).toBeTruthy();
    expect(container.querySelector('[data-testid="custom-clear"]')).toBeTruthy();

    rerender(<RangePicker locale={enUS} value={[somePoint, somePoint]} allowClear={{}} />);
    expect(getClearButton()).toBeTruthy();
  });

  it('should support deep merge locale with partial fields', () => {
    setMockDate();

    const { container } = render(
      <RangePicker
        open
        locale={{ lang: { shortWeekDays: ['一', '二', '三', '四', '五', '六', '日'] } } as any}
      />,
    );

    expect(container.querySelector('.ant-picker-content thead')?.textContent).toBe(
      '一二三四五六日',
    );

    expect(container.querySelector<HTMLInputElement>('input')).toHaveAttribute(
      'placeholder',
      'Start date',
    );

    resetMockDate();
  });

  describe('suffixIcon', () => {
    it('should render custom suffixIcon', () => {
      const { container } = render(
        <RangePicker open suffixIcon={<div className="custom-suffix-icon">Custom Icon</div>} />,
      );
      expect(container.querySelector('.custom-suffix-icon')).toBeTruthy();
    });

    it('should render global suffixIcon', () => {
      const { container } = render(
        <ConfigProvider
          datePicker={{
            suffixIcon: <div className="global-custom-suffix-icon">Global Custom Icon</div>,
          }}
        >
          <RangePicker open />
        </ConfigProvider>,
      );
      expect(container.querySelector('.global-custom-suffix-icon')).toBeTruthy();
    });

    it('should prefer custom suffixIcon over global suffixIcon', () => {
      const { container } = render(
        <ConfigProvider
          datePicker={{
            suffixIcon: <div className="global-custom-suffix-icon">Global Custom Icon</div>,
          }}
        >
          <RangePicker open suffixIcon={<div className="custom-suffix-icon">Custom Icon</div>} />
        </ConfigProvider>,
      );
      expect(container.querySelector('.custom-suffix-icon')).toBeTruthy();
      expect(container.querySelector('.global-custom-suffix-icon')).toBeFalsy();
    });
  });

  describe('clearIcon', () => {
    it('should render custom clearIcon', () => {
      const { container } = render(
        <RangePicker
          value={[dayjs(), dayjs()]}
          allowClear={{ clearIcon: <div className="custom-clear-icon">Custom Clear Icon</div> }}
        />,
      );
      expect(container.querySelector('.custom-clear-icon')).toBeTruthy();
    });

    it('should render global clearIcon', () => {
      const { container } = render(
        <ConfigProvider
          datePicker={{
            allowClear: {
              clearIcon: <div className="global-custom-clear-icon">Global Custom Clear Icon</div>,
            },
          }}
        >
          <RangePicker value={[dayjs(), dayjs()]} />
        </ConfigProvider>,
      );
      expect(container.querySelector('.global-custom-clear-icon')).toBeTruthy();
    });

    it('should prefer custom clearIcon over global clearIcon', () => {
      const { container } = render(
        <ConfigProvider
          datePicker={{
            allowClear: {
              clearIcon: <div className="global-custom-clear-icon">Global Custom Clear Icon</div>,
            },
          }}
        >
          <RangePicker
            value={[dayjs(), dayjs()]}
            allowClear={{ clearIcon: <div className="custom-clear-icon">Custom Clear Icon</div> }}
          />
        </ConfigProvider>,
      );
      expect(container.querySelector('.custom-clear-icon')).toBeTruthy();
      expect(container.querySelector('.global-custom-clear-icon')).toBeFalsy();
    });
  });
});
