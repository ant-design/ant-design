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
          prefix: 'my-prefix',
          input: 'my-input',
          suffix: 'my-suffix',
          popup: 'my-popup',
        };

        const styles = {
          root: { backgroundColor: 'red' },
          prefix: { backgroundColor: 'blue' },
          input: { backgroundColor: 'green' },
          suffix: { backgroundColor: 'yellow' },
          popup: { root: { backgroundColor: 'purple' } },
        };

        render(renderFn({ classNames, styles, prefix: 'bamboo', open: true }));

        expect(document.body.querySelector(`.ant-picker`)).toHaveClass(classNames.root);
        expect(document.body.querySelector(`.ant-picker-prefix`)).toHaveClass(classNames.prefix);
        expect(document.body.querySelector(`.ant-picker-input input`)).toHaveClass(
          classNames.input,
        );
        expect(document.body.querySelector(`.ant-picker-suffix`)).toHaveClass(classNames.suffix);
        expect(document.body.querySelector(`.ant-picker-dropdown`)).toHaveClass(
          classNames.popup as string,
        );

        expect(document.body.querySelector(`.${classNames.root}`)).toHaveStyle(styles.root);
        expect(document.body.querySelector(`.${classNames.prefix}`)).toHaveStyle(styles.prefix);
        expect(document.body.querySelector(`.${classNames.input}`)).toHaveStyle(styles.input);
        expect(document.body.querySelector(`.${classNames.suffix}`)).toHaveStyle(styles.suffix);
        expect(document.body.querySelector(`.${classNames.popup}`)).toHaveStyle(styles.popup.root);
      });
    }

    test('DatePicker - Single', (props) => <DatePicker {...props} />);
    test('DatePicker - Multiple', (props) => <DatePicker.RangePicker {...props} />);
    test('TimePicker - Single', (props) => <DatePicker {...props} picker="time" />);
    test('TimePicker - Multiple', (props) => <DatePicker.RangePicker {...props} picker="time" />);
  });

  describe('popup', () => {
    function test(name: string, renderFn: (props: any) => React.ReactElement) {
      it(name, () => {
        const classNames: NonNullable<DatePickerProps['classNames']> = {
          popup: {
            header: 'my-header',
            body: 'my-body',
            content: 'my-content',
            item: 'my-item',
            footer: 'my-footer',
          },
        };

        const styles = {
          popup: {
            header: { backgroundColor: 'red' },
            body: { backgroundColor: 'blue' },
            content: { backgroundColor: 'green' },
            item: { backgroundColor: 'yellow' },
            footer: { root: { backgroundColor: 'purple' } },
          },
        };

        render(renderFn({ classNames, styles, prefix: 'bamboo', open: true, needConfirm: true }));
      });
    }
  });
});
