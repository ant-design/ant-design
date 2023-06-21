import * as React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import ConfigProvider from '..';
import Button from '../../button';
import Divider from '../../divider';
import { render } from '../../../tests/utils';

describe('ConfigProvider.DynamicTheme', () => {
  beforeEach(() => {
    Array.from(document.querySelectorAll('style')).forEach((style) => {
      style.parentNode?.removeChild(style);
    });
  });

  it('customize primary color', () => {
    render(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f00000',
          },
        }}
      >
        <Button />
      </ConfigProvider>,
    );

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    expect(
      dynamicStyles.some((style) => {
        const { innerHTML } = style;
        return (
          innerHTML.includes('.ant-btn-primary') && innerHTML.includes('background-color:#f00000')
        );
      }),
    ).toBeTruthy();
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
          innerHTML.includes('.ant-divider') && innerHTML.includes('border-block-start:0 blue')
        );
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
});
