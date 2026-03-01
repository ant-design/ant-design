import React from 'react';

import DatePicker from '..';
import { render } from '../../../tests/utils';
import type { DatePickerSemanticAllType } from '../generatePicker/interface';

describe('DatePicker.Semantic', () => {
  describe('inline', () => {
    function test(name: string, renderFn: (props: any) => React.ReactElement) {
      it(name, () => {
        const classNames: DatePickerSemanticAllType['classNames'] = {
          root: 'my-root',
          prefix: 'my-prefix',
          input: 'my-input',
          suffix: 'my-suffix',
          popup: 'my-popup',
        };

        const styles: DatePickerSemanticAllType['styles'] = {
          root: { backgroundColor: 'rgba(0, 123, 255, 0.8)' },
          prefix: { backgroundColor: 'rgba(40, 167, 69, 0.9)' },
          input: { backgroundColor: 'rgba(255, 193, 7, 0.7)' },
          suffix: { backgroundColor: 'rgba(220, 53, 69, 0.6)' },
          popup: { root: { backgroundColor: 'rgba(108, 117, 125, 0.85)' } },
        };

        render(renderFn({ classNames, styles, prefix: 'bamboo', open: true }));

        expect(document.body.querySelector(`.ant-picker`)).toHaveClass(classNames.root as string);
        expect(document.body.querySelector(`.ant-picker-prefix`)).toHaveClass(
          classNames.prefix as string,
        );
        expect(document.body.querySelector(`.ant-picker-input input`)).toHaveClass(
          classNames.input as string,
        );
        expect(document.body.querySelector(`.ant-picker-suffix`)).toHaveClass(
          classNames.suffix as string,
        );
        expect(document.body.querySelector(`.ant-picker-dropdown`)).toHaveClass(
          classNames.popup as string,
        );

        expect(document.body.querySelector(`.${classNames.root}`)).toHaveStyle(
          styles.root as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames.prefix}`)).toHaveStyle(
          styles.prefix as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames.input}`)).toHaveStyle(
          styles.input as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames.suffix}`)).toHaveStyle(
          styles.suffix as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames.popup}`)).toHaveStyle(
          styles.popup?.root as Record<string, string>,
        );
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
        const classNames: DatePickerSemanticAllType['classNamesNoString'] = {
          popup: {
            header: 'my-header',
            body: 'my-body',
            content: 'my-content',
            item: 'my-item',
            footer: 'my-footer',
          },
        };

        const styles: DatePickerSemanticAllType['styles'] = {
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
            classNames?.popup?.header as string,
          );
          expect(document.body.querySelector(`.ant-picker-body`)).toHaveClass(
            classNames?.popup?.body as string,
          );
        }
        expect(document.body.querySelector(`.ant-picker-content`)).toHaveClass(
          classNames?.popup?.content as string,
        );
        expect(
          document.body.querySelector(`.ant-picker-cell, .ant-picker-time-panel-cell`),
        ).toHaveClass(classNames?.popup?.item as string);
        expect(document.body.querySelector(`.ant-picker-footer`)).toHaveClass(
          classNames?.popup?.footer as string,
        );

        if (!ignoreTimePickerMissing) {
          expect(document.body.querySelector(`.${classNames?.popup?.header}`)).toHaveStyle(
            styles.popup?.header as Record<string, string>,
          );
          expect(document.body.querySelector(`.${classNames?.popup?.body}`)).toHaveStyle(
            styles.popup?.body as Record<string, string>,
          );
        }

        expect(document.body.querySelector(`.${classNames?.popup?.content}`)).toHaveStyle(
          styles.popup?.content as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames?.popup?.item}`)).toHaveStyle(
          styles.popup?.item as Record<string, string>,
        );
        expect(document.body.querySelector(`.${classNames?.popup?.footer}`)).toHaveStyle(
          styles.popup?.footer as Record<string, string>,
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

  it('should support semantic styles', () => {
    const styles = {
      root: { backgroundColor: 'red' },
      input: { color: 'blue' },
      suffix: { fontSize: '20px' },
    };
    const { container } = render(<DatePicker styles={styles} />);
    const rootElement = container.querySelector('.ant-picker');
    const inputElement = container.querySelector('.ant-picker-input input');
    const suffixElement = container.querySelector('.ant-picker-suffix');

    expect(rootElement).toHaveStyle('background-color: rgb(255, 0, 0)');
    expect(inputElement).toHaveStyle('color: rgb(0, 0, 255)');
    expect(suffixElement).toHaveStyle('font-size: 20px');
  });

  it('should support semantic classNames as function', () => {
    const classNamesFn: DatePickerSemanticAllType['classNamesFn'] = (
      info,
    ): DatePickerSemanticAllType['classNames'] => {
      if (info.props.disabled) {
        return { root: 'disabled-root' };
      }
      return { root: 'enabled-root' };
    };

    const { container, rerender } = render(<DatePicker classNames={classNamesFn} />);
    expect(container.querySelector('.enabled-root')).toBeTruthy();

    rerender(<DatePicker disabled classNames={classNamesFn} />);
    expect(container.querySelector('.disabled-root')).toBeTruthy();
  });

  it('should support semantic styles as function', () => {
    const stylesFn: DatePickerSemanticAllType['stylesFn'] = (
      info,
    ): DatePickerSemanticAllType['styles'] => {
      if (info.props.size === 'large') {
        return { root: { fontSize: '18px' } };
      }
      return { root: { fontSize: '14px' } };
    };

    const { container, rerender } = render(<DatePicker styles={stylesFn} />);
    const rootElement = container.querySelector('.ant-picker');
    expect(rootElement).toHaveStyle('font-size: 14px');

    rerender(<DatePicker size="large" styles={stylesFn} />);
    const largeRootElement = container.querySelector('.ant-picker');
    expect(largeRootElement).toHaveStyle('font-size: 18px');
  });
});
