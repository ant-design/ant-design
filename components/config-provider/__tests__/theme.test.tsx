import React from 'react';
import kebabCase from 'lodash/kebabCase';
import canUseDom from 'rc-util/lib/Dom/canUseDom';

import ConfigProvider from '..';
import { InputNumber } from '../..';
import { resetWarned } from '../../_util/warning';
import { render } from '../../../tests/utils';
import theme from '../../theme';
import { useToken } from '../../theme/internal';

const { defaultAlgorithm, darkAlgorithm, compactAlgorithm } = theme;

// eslint-disable-next-line no-var
var mockCanUseDom = true;

jest.mock('rc-util/lib/Dom/canUseDom', () => () => mockCanUseDom);

describe('ConfigProvider.Theme', () => {
  beforeEach(() => {
    mockCanUseDom = true;
  });

  const colorList = ['primaryColor', 'successColor', 'warningColor', 'errorColor', 'infoColor'];

  colorList.forEach((colorName) => {
    it(colorName, () => {
      ConfigProvider.config({
        prefixCls: 'bamboo',
        theme: {
          [colorName]: '#0000FF',
        },
      });

      const styles: any[] = Array.from(document.querySelectorAll('style'));
      const themeStyle = styles.find((style) =>
        style.getAttribute('rc-util-key').includes('-dynamic-theme'),
      );
      expect(themeStyle).toBeTruthy();

      expect(themeStyle.innerHTML).toContain(`--bamboo-${kebabCase(colorName)}: rgb(0, 0, 255)`);
    });
  });

  it('warning for SSR', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockCanUseDom = false;
    expect(canUseDom()).toBeFalsy();

    ConfigProvider.config({
      theme: {
        infoColor: 'red',
      },
    });

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] SSR do not support dynamic theme with css variables.',
    );
    errorSpy.mockRestore();
  });

  it('algorithm should work', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' }, algorithm: darkAlgorithm }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimaryText).toBe('#1668dc');
  });

  it('compactAlgorithm should work', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ algorithm: compactAlgorithm }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef).toEqual(
      expect.objectContaining({
        sizeXXL: 48,
        sizeXL: 32,
        sizeLG: 16,
        sizeMD: 16,
        sizeMS: 12,
        size: 8,
        sizeSM: 8,
        sizeXS: 4,
        sizeXXS: 4,
      }),
    );
  });

  it('should support algorithm array', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider
        theme={{ token: { colorPrimary: '#1677ff' }, algorithm: [defaultAlgorithm, darkAlgorithm] }}
      >
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimaryText).toBe('#1668dc');
  });

  it('overriding component token should work', () => {
    render(
      <ConfigProvider theme={{ components: { InputNumber: { handleWidth: 50.1234 } } }}>
        <InputNumber />
      </ConfigProvider>,
    );
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]')).map(
      (item) => item?.innerHTML ?? '',
    );
    expect(
      dynamicStyles.some(
        (style) => style.includes('.ant-input-number') && style.includes('width:50.1234px'),
      ),
    ).toBeTruthy();
  });

  it('hashed should be true if not changed', () => {
    let hashId = 'hashId';

    theme.defaultConfig.hashed = true;

    const Demo = () => {
      const [, , hash] = useToken();
      hashId = hash;
      return null;
    };

    render(
      <ConfigProvider theme={{ components: { InputNumber: { handleWidth: 50.1234 } } }}>
        <Demo />
      </ConfigProvider>,
    );

    expect(hashId).not.toBe('');

    theme.defaultConfig.hashed = false;
  });

  it('The order does not affect the result', () => {
    const tokens = {
      a: {},
      b: {},
    };
    const Token: React.FC<{ type: 'a' | 'b' }> = ({ type }) => {
      const [, token] = useToken();
      tokens[type] = token;
      return null;
    };
    render(
      <>
        <ConfigProvider theme={{ algorithm: [darkAlgorithm, compactAlgorithm] }}>
          <Token type="a" />
        </ConfigProvider>
        <ConfigProvider theme={{ algorithm: [compactAlgorithm, darkAlgorithm] }}>
          <Token type="b" />
        </ConfigProvider>
      </>,
    );
    expect(tokens.a).toMatchObject(tokens.b);
  });

  it('theme separated should work', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1677ff' } }}>
        <ConfigProvider theme={{ inherit: false }}>
          <Demo />
        </ConfigProvider>
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimaryText).toBe('#1677ff');
  });
});
