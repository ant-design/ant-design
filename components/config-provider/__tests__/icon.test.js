import { SmileOutlined } from '@ant-design/icons';
import IconContext from '@ant-design/icons/lib/components/Context';
import { mount } from 'enzyme';
import React from 'react';
import ConfigProvider from '..';

describe('ConfigProvider.Icon', () => {
  beforeEach(() => {
    // eslint-disable-next-line jest/no-standalone-expect
    expect(document.querySelectorAll('style')).toHaveLength(0);
  });

  afterEach(() => {
    document.querySelectorAll('style').forEach(style => {
      style.parentNode.removeChild(style);
    });
  });

  describe('csp', () => {
    it('raw', () => {
      mount(
        <ConfigProvider csp={{ nonce: 'little' }}>
          <SmileOutlined />
        </ConfigProvider>,
      );

      const styleNode = document.querySelector('style');
      expect(styleNode.nonce).toEqual('little');
    });

    it('mix with iconPrefixCls', () => {
      const wrapper = mount(
        <ConfigProvider iconPrefixCls="bamboo" csp={{ nonce: 'light' }}>
          <SmileOutlined />
        </ConfigProvider>,
      );

      const styleNode = document.querySelector('style');

      expect(wrapper.exists('.bamboo-smile')).toBeTruthy();
      expect(styleNode.nonce).toEqual('light');
    });
  });

  it('nest', () => {
    const Checker = () => {
      const { csp } = React.useContext(IconContext);
      return <div id="csp">{csp.nonce}</div>;
    };

    const wrapper = mount(
      <ConfigProvider iconPrefixCls="bamboo" csp={{ nonce: 'light' }}>
        <ConfigProvider>
          <SmileOutlined />
          <Checker />
        </ConfigProvider>
      </ConfigProvider>,
    );

    const styleNode = document.querySelector('style');

    expect(wrapper.exists('.bamboo-smile')).toBeTruthy();
    expect(styleNode.nonce).toEqual('light');
    expect(wrapper.find('#csp').text()).toEqual('light');
  });
});
