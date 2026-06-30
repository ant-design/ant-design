import React from 'react';
import { createCache, StyleProvider } from '@ant-design/cssinjs';
import { SmileOutlined } from '@ant-design/icons';
import IconContext from '@ant-design/icons/lib/components/Context';

import ConfigProvider from '..';
import { render } from '../../../tests/utils';
import Button from '../../button';

declare module '@ant-design/icons/lib/components/Context' {
  interface IconContextProps {
    zeroRuntime?: boolean;
  }
}

describe('ConfigProvider.Icon', () => {
  beforeEach(() => {
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
      expect(styleNode?.nonce).toBe('little');
    });

    it('mix with iconPrefixCls', () => {
      const { container } = render(
        <ConfigProvider iconPrefixCls="bamboo" csp={{ nonce: 'light' }}>
          <SmileOutlined />
        </ConfigProvider>,
      );

      const styleNode = document.querySelector('style');

      expect(container.querySelector('.bamboo-smile')).toBeTruthy();
      expect(styleNode?.nonce).toBe('light');
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
    expect(styleNode?.nonce).toBe('light');
    expect(container.querySelector('#csp')?.innerHTML).toBe('light');
  });

  it('passes zeroRuntime theme config to icon context', () => {
    const Checker = () => {
      const { zeroRuntime } = React.useContext(IconContext);
      return <div id="zero-runtime">{String(zeroRuntime)}</div>;
    };

    const { container } = render(
      <ConfigProvider theme={{ zeroRuntime: true }}>
        <Checker />
      </ConfigProvider>,
    );

    expect(container.querySelector('#zero-runtime')?.innerHTML).toBe('true');
  });

  it('does not rewrite icon runtime style when cssinjs layer is enabled', () => {
    render(<SmileOutlined />);

    const runtimeStyle = document.querySelector<HTMLStyleElement>(
      'style[rc-util-key="@ant-design-icons"]',
    );

    expect(runtimeStyle).toBeTruthy();
    expect(runtimeStyle?.innerHTML).not.toContain('@layer antd');

    render(
      <StyleProvider layer cache={createCache()}>
        <ConfigProvider>
          <SmileOutlined />
        </ConfigProvider>
      </StyleProvider>,
    );

    expect(runtimeStyle?.innerHTML).not.toContain('@layer antd');
    expect(
      Array.from(document.querySelectorAll('style')).some(
        (style) => style.innerHTML.includes('@layer antd') && style.innerHTML.includes('.anticon'),
      ),
    ).toBeTruthy();
  });

  it('cssinjs should support nonce', () => {
    render(
      <StyleProvider cache={createCache()}>
        <ConfigProvider csp={{ nonce: 'bamboo' }}>
          <Button />
        </ConfigProvider>
      </StyleProvider>,
    );

    const styleList = Array.from(document.querySelectorAll('style'));

    expect(styleList.length).toBeTruthy();
    styleList.forEach((style) => {
      expect(style.nonce).toBe('bamboo');
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('nonce applies to all style tags', () => {
    render(
      <ConfigProvider csp={{ nonce: 'bamboo' }} theme={{ token: { borderRadius: 2 } }}>
        <Button />
      </ConfigProvider>,
    );

    const styleNodes = document.querySelectorAll('style');

    styleNodes.forEach((node) => {
      expect(node?.nonce).toBe('bamboo');
    });
  });
});
