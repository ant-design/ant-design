import * as React from 'react';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { SmileOutlined } from '@ant-design/icons';

import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Button from '../../button';
import Divider from '../../divider';

describe('ConfigProvider.DynamicTheme', () => {
  beforeEach(() => {
    Array.from(document.querySelectorAll('style')).forEach((style) => {
      style.parentNode?.removeChild(style);
    });
  });

  it('customize primary color', () => {
    const { container } = render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f00000',
          },
        }}
      >
        <Button type="primary" />
      </ConfigProvider>,
    );

    expect(container.querySelector('.ant-btn')).toHaveStyle({
      '--ant-btn-color-base': 'var(--ant-color-primary)',
      '--ant-color-primary': '#f00000',
    });
  });

  it('not crash on null token', () => {
    expect(() => {
      render(
        <ConfigProvider
          theme={{
            token: null as any,
          }}
        />,
      );
    }).not.toThrow();
  });

  it('should support overriding aliasToken', () => {
    render(
      <ConfigProvider
        theme={{
          token: {
            colorSplit: 'blue',
          },
        }}
      >
        <Divider />
      </ConfigProvider>,
    );

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return (
          innerHTML.includes('.ant-divider') &&
          innerHTML.includes('border-block-start:0 var(--ant-color-split)')
        );
      }),
    ).toBeTruthy();

    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return innerHTML.includes('.css-var') && innerHTML.includes('--ant-color-split:blue');
      }),
    ).toBeTruthy();
  });

  it('should support iconPrefixCls', () => {
    const { container } = render(
      <ConfigProvider iconPrefixCls="test-icon">
        <SmileOutlined />
      </ConfigProvider>,
    );

    expect(container.querySelector('.test-icon')).toBeTruthy();

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));
    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return innerHTML.includes('.test-icon');
      }),
    ).toBeTruthy();
  });

  it('icon styles should use cssVar key from theme config', () => {
    render(
      <ConfigProvider theme={{ cssVar: { key: 'custom-css-var' } }}>
        <SmileOutlined />
      </ConfigProvider>,
    );

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    // Should have styles with the custom cssVar key
    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return innerHTML.includes('.custom-css-var');
      }),
    ).toBeTruthy();

    // Should NOT have styles with the default css-var-root key
    // This ensures icon styles registered inside ConfigProvider use the correct context
    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return innerHTML.includes('.css-var-root');
      }),
    ).toBeFalsy();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('layer should affect icon', () => {
    render(
      <StyleProvider layer cache={createCache()}>
        <ConfigProvider>
          <SmileOutlined />
        </ConfigProvider>
      </StyleProvider>,
    );

    const styles = Array.from(document.querySelectorAll('style'));
    expect(styles.length).toBeTruthy();
    styles.forEach((style) => {
      expect(style.innerHTML).toContain('@layer antd');
    });
  });
});
