import * as React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Button from '../../button';
import Divider from '../../divider';

describe('ConfigProvider.DynamicTheme', () => {
  beforeEach(() => {
    Array.from(document.querySelectorAll('style')).forEach(style => {
      style.parentNode?.removeChild(style);
    });
  });

  it('customize primary color', () => {
    mount(
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#f00',
          },
        }}
      >
        <Button />
      </ConfigProvider>,
    );

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    expect(
      dynamicStyles.some(style => {
        const { innerHTML } = style;
        return (
          innerHTML.includes('.ant-btn-primary') && innerHTML.includes('background-color:#f00')
        );
      }),
    ).toBeTruthy();
  });

  it('not crash on null token', () => {
    expect(() => {
      mount(
        <ConfigProvider
          theme={{
            token: null as any,
          }}
        />,
      );
    }).not.toThrow();
  });

  it('should support overriding aliasToken', () => {
    mount(
      <ConfigProvider
        theme={{
          override: {
            alias: {
              colorSplit: 'blue',
            },
          },
        }}
      >
        <Divider />
      </ConfigProvider>,
    );

    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]'));

    expect(
      dynamicStyles.some(style => {
        const { innerHTML } = style;
        return (
          innerHTML.includes('.ant-divider') && innerHTML.includes('border-block-start:0 blue')
        );
      }),
    ).toBeTruthy();
  });
});
