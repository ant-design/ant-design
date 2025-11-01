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

    const rootElement = document.querySelector<HTMLElement>('.ant-alert');
    expect(rootElement).toHaveClass('error-alert');
    expect(rootElement).toHaveStyle({ backgroundColor: 'rgb(255, 247, 230)' });

    rerender(
      <Alert title="Test Alert" type="success" classNames={classNamesFn} styles={stylesFn} />,
    );

    const updatedRootElement = document.querySelector<HTMLElement>('.ant-alert');
    expect(updatedRootElement).toHaveClass('default-alert');
    expect(updatedRootElement).toHaveStyle({ backgroundColor: 'rgb(246, 255, 237)' });
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
      <ConfigProvider alert={{ classNames: contextClassNames, styles: contextStyles }}>
        <Alert
          title="Test Alert"
          showIcon
          classNames={componentClassNames}
          styles={componentStyles}
        />
      </ConfigProvider>,
    );

    const rootElement = document.querySelector<HTMLElement>('.ant-alert');
    const iconElement = document.querySelector<HTMLElement>('.ant-alert-icon');
    const titleElement = document.querySelector<HTMLElement>('.ant-alert-title');

    // Check merged classNames
    expect(rootElement).toHaveClass('context-root component-root');
    expect(iconElement).toHaveClass('context-icon');
    expect(titleElement).toHaveClass('component-title');

    // Check merged styles
    expect(rootElement).toHaveStyle({ margin: '10px', padding: '5px' });
    expect(iconElement).toHaveStyle({ fontSize: '16px' });
    expect(titleElement).toHaveStyle({ fontWeight: 'bold' });
  });
});
