import React from 'react';

import type { DatePickerProps } from '..';
import DatePicker from '..';
import { render } from '../../../tests/utils';

describe('Progress.Semantic', () => {
  describe('inline', () => {
    function test(name: string, renderFn: (props: any) => React.ReactElement) {
      it(name, () => {
        const classNames: Required<NonNullable<DatePickerProps['classNames']>> = {
          root: 'my-root',
          popup: { root: 'my-popup' },
        };

        const styles = {
          root: { backgroundColor: 'red' },
          popup: { root: { backgroundColor: 'purple' } },
        };

        render(renderFn({ classNames, styles, open: true }));

        expect(document.body.querySelector(`.ant-picker`)).toHaveClass(classNames.root);
        expect(document.body.querySelector(`.ant-picker-dropdown`)).toHaveClass(
          classNames.popup?.root!,
        );

        expect(document.body.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
        expect(document.body.querySelector(`.${classNames.popup?.root!}`)).toHaveStyle(
          styles.popup.root,
        );
      });
    }

    test('DatePicker - Single', (props) => <DatePicker {...props} />);
    test('DatePicker - Multiple', (props) => <DatePicker.RangePicker {...props} />);
    test('TimePicker - Single', (props) => <DatePicker {...props} picker="time" />);
    test('TimePicker - Multiple', (props) => <DatePicker.RangePicker {...props} picker="time" />);
  });
});
