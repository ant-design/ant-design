import React from 'react';
import kebabCase from 'lodash/kebabCase';
import canUseDom from 'rc-util/lib/Dom/canUseDom';

import ConfigProvider from '..';
import { InputNumber, Button, Select } from '../..';
import { render } from '../../../tests/utils';
import { resetWarned } from '../../_util/warning';
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

  it('theme inherit should not affect hashed and cssVar', () => {
    let hashId = 'hashId';
    let cssVar;

    const Demo = () => {
      const [, , hash, , cssVarConfig] = useToken();
      hashId = hash;
      cssVar = cssVarConfig;
      return null;
    };

    render(
      <ConfigProvider theme={{ hashed: true, cssVar: true }}>
        <ConfigProvider theme={{ inherit: false }}>
          <Demo />
        </ConfigProvider>
      </ConfigProvider>,
    );

    expect(hashId).toBeTruthy();
    expect(cssVar).toBeTruthy();
  });

  describe('cssVar', () => {
    it('should work', () => {
      const { container } = render(
        <ConfigProvider theme={{ cssVar: { key: 'foo' } }}>
          <Button>Button</Button>
        </ConfigProvider>,
      );

      const button = container.querySelector('button')!;

      expect(button).toHaveClass('foo');
      expect(button).toHaveStyle({
        '--ant-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--ant-button-default-shadow)',
        'border-radius': 'var(--ant-border-radius)',
      });
    });

    it('prefix', () => {
      const { container } = render(
        <>
          <ConfigProvider theme={{ cssVar: { key: 'foo' }, hashed: true }}>
            <Button className="button-foo">Button</Button>
          </ConfigProvider>
          <ConfigProvider theme={{ cssVar: { key: 'bar', prefix: 'bar' }, hashed: true }}>
            <Button className="button-bar">Button</Button>
          </ConfigProvider>
        </>,
      );

      const fooBtn = container.querySelector('.button-foo')!;
      const barBtn = container.querySelector('.button-bar')!;

      expect(fooBtn).toHaveClass('foo');
      expect(fooBtn).toHaveStyle({
        '--ant-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--ant-button-default-shadow)',
        'border-radius': 'var(--ant-border-radius)',
      });

      expect(barBtn).toHaveClass('bar');
      expect(barBtn).toHaveStyle({
        '--bar-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--bar-button-default-shadow)',
        'border-radius': 'var(--bar-border-radius)',
      });
    });

    it('prefix follow prefixCls by default', () => {
      const { container } = render(
        <>
          <ConfigProvider prefixCls="foo" theme={{ cssVar: { key: 'foo' }, hashed: true }}>
            <Button className="button-foo">Button</Button>
          </ConfigProvider>
          <ConfigProvider prefixCls="bar">
            <ConfigProvider theme={{ cssVar: { key: 'bar' }, hashed: true }}>
              <Button className="button-bar">Button</Button>
            </ConfigProvider>
          </ConfigProvider>
          <ConfigProvider prefixCls="apple">
            <ConfigProvider prefixCls="banana" theme={{ cssVar: { key: 'banana' }, hashed: true }}>
              <Button className="button-banana">Button</Button>
            </ConfigProvider>
          </ConfigProvider>
          <ConfigProvider
            prefixCls="apple"
            theme={{ cssVar: { key: 'apple', prefix: 'cat' }, hashed: true }}
          >
            <Button className="button-cat">Button</Button>
          </ConfigProvider>
        </>,
      );

      const fooBtn = container.querySelector('.button-foo')!;
      expect(fooBtn).toHaveClass('foo');
      expect(fooBtn).toHaveStyle({
        '--foo-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--foo-button-default-shadow)',
        'border-radius': 'var(--foo-border-radius)',
      });

      const barBtn = container.querySelector('.button-bar')!;
      expect(barBtn).toHaveClass('bar');
      expect(barBtn).toHaveStyle({
        '--bar-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--bar-button-default-shadow)',
        'border-radius': 'var(--bar-border-radius)',
      });

      const bananaBtn = container.querySelector('.button-banana')!;
      expect(bananaBtn).toHaveClass('banana');
      expect(bananaBtn).toHaveStyle({
        '--banana-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--banana-button-default-shadow)',
        'border-radius': 'var(--banana-border-radius)',
      });

      const catBtn = container.querySelector('.button-cat')!;
      expect(catBtn).toHaveClass('apple');
      expect(catBtn).toHaveStyle({
        '--cat-color-text': 'rgba(0, 0, 0, 0.88)',
        boxShadow: 'var(--cat-button-default-shadow)',
        'border-radius': 'var(--cat-border-radius)',
      });
    });

    it('component token should work', () => {
      const { container } = render(
        <ConfigProvider
          theme={{
            cssVar: { key: 'foo' },
            hashed: true,
            components: { Select: { colorPrimary: '#1890ff', optionSelectedColor: '#000' } },
          }}
        >
          <Select className="select-foo" />
        </ConfigProvider>,
      );

      const select = container.querySelector('.select-foo')!;
      expect(select).toHaveStyle({
        '--ant-color-primary': '#1890ff',
        '--ant-select-option-selected-color': '#000',
        '--ant-select-option-selected-font-weight': '600',
        '--ant-select-z-index-popup': '1050',
      });
    });
  });
});
