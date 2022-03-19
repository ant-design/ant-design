import * as React from 'react';
import { mount } from 'enzyme';
import ConfigProvider from '..';
import Button from '../../button';

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
            primaryColor: '#f00',
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
});
