import React from 'react';
import { render } from '@testing-library/react';

import { resetWarned } from '../../_util/warning';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import ColorPicker from '../ColorPicker';

describe('ColorPicker.Semantic', () => {
  mountTest(ColorPicker);
  rtlTest(ColorPicker);
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  beforeEach(() => {
    resetWarned();
    jest.useFakeTimers();
  });

  afterEach(() => {
    errorSpy.mockReset();
    jest.useRealTimers();
  });

  it('support classNames and styles', () => {
    const testClassNames = {
      root: 'test-root',
      popup: {
        root: 'test-popup',
      },
    };
    const testStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      popup: {
        root: { color: 'rgb(0, 255, 0)' },
      },
    };
    const { container } = render(
      <ColorPicker defaultValue="red" open classNames={testClassNames} styles={testStyles} />,
    );
    const root = container.querySelector('.ant-color-picker-trigger');
    const popup = container.querySelector('.ant-color-picker');
    expect(root).toHaveClass(testClassNames.root);
    expect(popup).toHaveClass(testClassNames.popup.root);
    expect(root).toHaveStyle(testStyles.root);
    expect(popup).toHaveStyle(testStyles.popup.root);
  });

  it('support classNames and styles as functions', () => {
    const classNamesFn = (info: { props: any }) => {
      if (info.props.disabled) {
        return { root: 'test-disabled' };
      }
      return { root: 'test-enabled' };
    };
    const stylesFn = (info: { props: any }) => {
      if (info.props.size === 'large') {
        return { root: { fontSize: '16px' } };
      }
      return { root: { fontSize: '14px' } };
    };

    const { container, rerender } = render(
      <ColorPicker defaultValue="red" classNames={classNamesFn} styles={stylesFn} />,
    );
    const root = container.querySelector<HTMLElement>('.ant-color-picker-trigger');
    expect(root).toHaveClass('test-enabled');
    expect(root).toHaveStyle({ fontSize: '14px' });

    rerender(
      <ColorPicker defaultValue="red" disabled classNames={classNamesFn} styles={stylesFn} />,
    );

    expect(root).toHaveClass('test-disabled');

    rerender(
      <ColorPicker defaultValue="red" size="large" classNames={classNamesFn} styles={stylesFn} />,
    );

    expect(root).toHaveStyle({ fontSize: '16px' });
  });
});
