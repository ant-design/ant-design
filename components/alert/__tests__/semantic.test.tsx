import React from 'react';

import Alert from '..';
import type { AlertProps } from '..';
import { render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('Alert.Semantic', () => {
  it('should support classNames and styles as functions', () => {
    const classNamesFn: AlertProps['classNames'] = jest.fn((info) => {
      if (info.props.type === 'error') {
        return { root: 'error-alert' };
      }
      return { root: 'default-alert' };
    });

    const stylesFn: AlertProps['styles'] = jest.fn((info) => {
      if (info.props.type === 'success') {
        return { root: { backgroundColor: '#f6ffed' } };
      }
      return { root: { backgroundColor: '#fff7e6' } };
    });

    const { rerender } = render(
      <Alert title="Test Alert" type="error" classNames={classNamesFn} styles={stylesFn} />,
    );

    expect(classNamesFn).toHaveBeenCalled();
    expect(stylesFn).toHaveBeenCalled();

    const rootElement = document.querySelector('.ant-alert') as HTMLElement;
    expect(rootElement).toHaveClass('error-alert');
    expect(rootElement.style.backgroundColor).toBe('rgb(255, 247, 230)');

    rerender(
      <Alert title="Test Alert" type="success" classNames={classNamesFn} styles={stylesFn} />,
    );

    const updatedRootElement = document.querySelector('.ant-alert') as HTMLElement;
    expect(updatedRootElement).toHaveClass('default-alert');
    expect(updatedRootElement.style.backgroundColor).toBe('rgb(246, 255, 237)');
  });

  it('should merge context and component classNames and styles', () => {
    const contextClassNames: AlertProps['classNames'] = {
      root: 'context-root',
      icon: 'context-icon',
    };
    const contextStyles: AlertProps['styles'] = {
      root: { margin: '10px' },
      icon: { fontSize: '16px' },
    };
    const componentClassNames: AlertProps['classNames'] = {
      root: 'component-root',
      title: 'component-title',
    };
    const componentStyles: AlertProps['styles'] = {
      root: { padding: '5px' },
      title: { fontWeight: 'bold' },
    };

    render(
      <ConfigProvider
        alert={{
          classNames: contextClassNames,
          styles: contextStyles,
        }}
      >
        <Alert
          title="Test Alert"
          showIcon
          classNames={componentClassNames}
          styles={componentStyles}
        />
      </ConfigProvider>,
    );

    const rootElement = document.querySelector('.ant-alert') as HTMLElement;
    const iconElement = document.querySelector('.ant-alert-icon') as HTMLElement;
    const titleElement = document.querySelector('.ant-alert-title') as HTMLElement;

    // Check merged classNames
    expect(rootElement).toHaveClass('context-root');
    expect(rootElement).toHaveClass('component-root');
    expect(iconElement).toHaveClass('context-icon');
    expect(titleElement).toHaveClass('component-title');

    // Check merged styles
    expect(rootElement.style.margin).toBe('10px'); // from context
    expect(rootElement.style.padding).toBe('5px'); // from component
    expect(iconElement.style.fontSize).toBe('16px'); // from context
    expect(titleElement.style.fontWeight).toBe('bold'); // from component
  });
});
