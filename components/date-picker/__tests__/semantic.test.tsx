import React from 'react';

import type { DatePickerProps } from '..';
import DatePicker from '..';
import { render } from '../../../tests/utils';

describe('DatePicker.Semantic', () => {
  describe('inline', () => {
    function test(name: string, renderFn: (props: any) => React.ReactElement) {
      it(name, () => {
        const classNames: Required<NonNullable<DatePickerProps['classNames']>> = {
          root: 'my-root',
          popup: { root: 'my-popup' },
        };

        const styles = {
          root: { backgroundColor: 'rgba(255, 0, 0, 1)' },
          popup: { root: { backgroundColor: 'rgba(128, 0, 128, 1)' } },
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

    it('DatePicker - Single - with popup className as string', () => {
      const classNamesConfig = {
        root: 'my-custom-root-str-popup',
        popup: 'my-custom-popup-flat-string',
      } as any;
      const stylesConfig = {
        root: { color: 'rgb(255, 0, 0)' },
        popup: { root: { color: 'rgb(0, 0, 255)' } },
      };

      render(<DatePicker classNames={classNamesConfig} styles={stylesConfig} open />);

      const pickerElement = document.body.querySelector('.ant-picker');
      const dropdownElement = document.body.querySelector('.ant-picker-dropdown');

      expect(pickerElement).toHaveClass(classNamesConfig.root);
      expect(dropdownElement).toHaveClass(classNamesConfig.popup);

      expect(pickerElement).toHaveStyle(stylesConfig.root);
      expect(dropdownElement).toHaveStyle(stylesConfig.popup.root);
    });

    it('DatePicker.RangePicker - with popup className as string', () => {
      const classNamesConfig = {
        root: 'my-custom-range-root-str-popup',
        popup: 'my-custom-range-popup-flat-string',
      } as any;
      const stylesConfig = {
        root: { borderColor: 'rgb(0, 255, 0)' }, // green
        popup: { root: { borderColor: 'rgb(255, 255, 0)' } }, // yellow
      };

      render(<DatePicker.RangePicker classNames={classNamesConfig} styles={stylesConfig} open />);

      const pickerElement = document.body.querySelector('.ant-picker');
      const dropdownElement = document.body.querySelector('.ant-picker-dropdown');

      expect(pickerElement).toHaveClass(classNamesConfig.root);
      expect(dropdownElement).toHaveClass(classNamesConfig.popup);

      expect(pickerElement).toHaveStyle(stylesConfig.root);
      expect(dropdownElement).toHaveStyle(stylesConfig.popup.root);
    });
  });
});
