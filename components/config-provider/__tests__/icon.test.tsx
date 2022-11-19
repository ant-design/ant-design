import { SmileOutlined } from '@ant-design/icons';
import IconContext from '@ant-design/icons/lib/components/Context';
import React from 'react';
import { render } from '../../../tests/utils';
import ConfigProvider from '..';

describe('ConfigProvider.Icon', () => {
  beforeEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(document.querySelectorAll('style')).toHaveLength(0);
  });

  afterEach(() => {
    document.querySelectorAll('style').forEach((style) => {
      style.parentNode?.removeChild(style);
    });
  });

  describe('csp', () => {
    it('raw', () => {
      render(
        <ConfigProvider csp={{ nonce: 'little' }}>
          <SmileOutlined />
        </ConfigProvider>,
      );
      const styleNode = document.querySelector('style');
      expect(styleNode?.nonce).toEqual('little');
    });

    it('mix with iconPrefixCls', () => {
      const { container } = render(
        <ConfigProvider iconPrefixCls="bamboo" csp={{ nonce: 'light' }}>
          <SmileOutlined />
        </ConfigProvider>,
      );

      const styleNode = document.querySelector('style');

      expect(container.querySelector('.bamboo-smile')).toBeTruthy();
      expect(styleNode?.nonce).toEqual('light');
    });
  });

  it('nest', () => {
    const Checker = () => {
      const { csp } = React.useContext(IconContext);
      return <div id="csp">{csp?.nonce}</div>;
    };

    const { container } = render(
      <ConfigProvider iconPrefixCls="bamboo" csp={{ nonce: 'light' }}>
        <ConfigProvider>
          <SmileOutlined />
          <Checker />
        </ConfigProvider>
      </ConfigProvider>,
    );

    const styleNode = document.querySelector('style');

    expect(container.querySelector('.bamboo-smile')).toBeTruthy();
    expect(styleNode?.nonce).toEqual('light');
    expect(container.querySelector('#csp')?.innerHTML).toEqual('light');
  });
});
