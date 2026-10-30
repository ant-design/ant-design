import React from 'react';
import { render } from '@testing-library/react';

import { resetWarned } from '../../_util/warning';
import ConfigProvider from '../../config-provider';
import {
  expectSemanticRootStylePriority,
  semanticRootStylePriority,
} from '../../../tests/shared/semanticStylePriority';
import ColorPicker from '../ColorPicker';
import type { ColorPickerProps } from '../interface';

describe('ColorPicker.Semantic', () => {
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

  it.each([false, true])('support popup.container with function = %s', (asFunction) => {
    const contextClassNames = { popup: { container: 'context-container' } };
    const contextStyles = { popup: { container: { width: 400 } } };
    const classNames = { popup: { container: 'custom-container' } };
    const styles = { popup: { container: { width: 480 } } };
    const contextConfig = {
      classNames: asFunction ? () => contextClassNames : contextClassNames,
      styles: asFunction ? () => contextStyles : contextStyles,
    };
    const { baseElement, rerender } = render(
      <ConfigProvider colorPicker={contextConfig}>
        <ColorPicker open />
      </ConfigProvider>,
    );

    const popupContainer = baseElement.querySelector('.ant-popover-container');
    expect(popupContainer).toHaveClass('context-container');
    expect(popupContainer).toHaveStyle({ width: '400px' });

    rerender(
      <ConfigProvider colorPicker={contextConfig}>
        <ColorPicker
          open
          classNames={asFunction ? () => classNames : classNames}
          styles={asFunction ? () => styles : styles}
        />
      </ConfigProvider>,
    );

    expect(popupContainer).toHaveClass('context-container', 'custom-container');
    expect(popupContainer).toHaveStyle({ width: '480px' });
    expect(errorSpy).not.toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/59738
  it.each([
    ['styles object', false, false],
    ['styles function', true, false],
    ['ConfigProvider styles object', false, true],
    ['ConfigProvider styles function', true, true],
  ])('support deprecated popupOverlayInner from %s', (_, asFunction, fromContext) => {
    const legacyStyles = { popupOverlayInner: { width: 480 } };
    const styles: ColorPickerProps['styles'] = asFunction ? () => legacyStyles : legacyStyles;
    const { baseElement } = render(
      fromContext ? (
        <ConfigProvider colorPicker={{ styles }}>
          <ColorPicker open />
        </ConfigProvider>
      ) : (
        <ColorPicker open styles={styles} />
      ),
    );

    expect(baseElement.querySelector('.ant-popover-container')).toHaveStyle({ width: '480px' });
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: ColorPicker] `styles.popupOverlayInner` is deprecated. Please use `styles.popup.container` instead.',
    );
  });

  it('prefer popup.container while preserving other popupOverlayInner styles', () => {
    const { baseElement } = render(
      <ColorPicker
        open
        styles={{
          popupOverlayInner: { width: 400, padding: 20 },
          popup: { container: { width: 480 } },
        }}
      />,
    );

    expect(baseElement.querySelector('.ant-popover-container')).toHaveStyle({
      width: '480px',
      padding: '20px',
    });
  });

  it('should follow root style priority', () => {
    const { container } = render(
      <ConfigProvider
        colorPicker={{
          styles: semanticRootStylePriority.contextStyles,
          style: semanticRootStylePriority.contextStyle,
        }}
      >
        <ColorPicker
          defaultValue="red"
          styles={semanticRootStylePriority.styles}
          style={semanticRootStylePriority.style}
        />
      </ConfigProvider>,
    );

    expectSemanticRootStylePriority(container.querySelector('.ant-color-picker-trigger'));
  });
});
