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
          prefix: 'my-prefix',
          input: 'my-input',
          suffix: 'my-suffix',
          popup: 'my-popup',
        };

        const styles = {
          root: { backgroundColor: 'rgba(0, 123, 255, 0.8)' },
          prefix: { backgroundColor: 'rgba(40, 167, 69, 0.9)' },
          input: { backgroundColor: 'rgba(255, 193, 7, 0.7)' },
          suffix: { backgroundColor: 'rgba(220, 53, 69, 0.6)' },
          popup: { root: { backgroundColor: 'rgba(108, 117, 125, 0.85)' } },
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
    function test(
      name: string,
      renderFn: (props: any) => React.ReactElement,
      ignoreTimePickerMissing = false,
    ) {
      it(name, () => {
        const classNames = {
          popup: {
            header: 'my-header',
            body: 'my-body',
            content: 'my-content',
            item: 'my-item',
            footer: 'my-footer',
          },
        } as const;

        const styles = {
          popup: {
            header: { backgroundColor: 'rgb(255, 0, 0)' },
            body: { backgroundColor: 'rgb(0, 0, 255)' },
            content: { backgroundColor: 'rgb(0, 255, 0)' },
            item: { backgroundColor: 'rgb(255, 255, 0)' },
            footer: { backgroundColor: 'rgb(128, 0, 128)' },
          },
        };

        render(renderFn({ classNames, styles, prefix: 'bamboo', open: true, needConfirm: true }));

        if (!ignoreTimePickerMissing) {
          expect(document.body.querySelector(`.ant-picker-header`)).toHaveClass(
            classNames.popup.header,
          );
          expect(document.body.querySelector(`.ant-picker-body`)).toHaveClass(
            classNames.popup.body,
          );
        }
        expect(document.body.querySelector(`.ant-picker-content`)).toHaveClass(
          classNames.popup.content,
        );
        expect(
          document.body.querySelector(`.ant-picker-cell, .ant-picker-time-panel-cell`),
        ).toHaveClass(classNames.popup.item);
        expect(document.body.querySelector(`.ant-picker-footer`)).toHaveClass(
          classNames.popup.footer,
        );

        if (!ignoreTimePickerMissing) {
          expect(document.body.querySelector(`.${classNames.popup.header}`)).toHaveStyle(
            styles.popup.header,
          );
          expect(document.body.querySelector(`.${classNames.popup.body}`)).toHaveStyle(
            styles.popup.body,
          );
        }

        expect(document.body.querySelector(`.${classNames.popup.content}`)).toHaveStyle(
          styles.popup.content,
        );
        expect(document.body.querySelector(`.${classNames.popup.item}`)).toHaveStyle(
          styles.popup.item,
        );
        expect(document.body.querySelector(`.${classNames.popup.footer}`)).toHaveStyle(
          styles.popup.footer,
        );
      });
    }

    test('DatePicker - Single', (props) => <DatePicker {...props} />);
    test('DatePicker - Multiple', (props) => <DatePicker.RangePicker {...props} />);
    test('TimePicker - Single', (props) => <DatePicker {...props} picker="time" />, true);
    test(
      'TimePicker - Multiple',
      (props) => <DatePicker.RangePicker {...props} picker="time" />,
      true,
    );
  });
});
