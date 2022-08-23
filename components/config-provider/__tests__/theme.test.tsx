import { kebabCase } from 'lodash';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import React from 'react';
import ConfigProvider from '..';
import { InputNumber } from '../..';
import { render } from '../../../tests/utils';
import { useToken } from '../../theme';
import theme from '../../theme/export';
import { resetWarned } from '../../_util/warning';

const { defaultAlgorithm, darkAlgorithm, defaultAlgorithmV4, darkAlgorithmV4 } = theme;

let mockCanUseDom = true;

jest.mock('rc-util/lib/Dom/canUseDom', () => () => mockCanUseDom);

describe('ConfigProvider.Theme', () => {
  beforeEach(() => {
    mockCanUseDom = true;
  });

  const colorList = ['primaryColor', 'successColor', 'warningColor', 'errorColor', 'infoColor'];

  colorList.forEach(colorName => {
    it(colorName, () => {
      ConfigProvider.config({
        prefixCls: 'bamboo',
        theme: {
          [colorName]: '#0000FF',
        },
      });

      const styles: any[] = Array.from(document.querySelectorAll('style'));
      const themeStyle = styles.find(style =>
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
      theme: {},
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
      <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimary).toBe('#177ddc');
  });

  it('defaultAlgorithmV4 should work', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' }, algorithm: defaultAlgorithmV4 }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimaryText).toBe('#1890ff');
  });

  it('darkAlgorithmV4 should work', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ token: { colorPrimary: '#1890ff' }, algorithm: darkAlgorithmV4 }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimaryText).toBe('#177ddc');
  });

  it('should support algorithm array', () => {
    let tokenRef: any;
    const Demo = () => {
      const [, token] = useToken();
      tokenRef = token;
      return null;
    };
    render(
      <ConfigProvider theme={{ algorithm: [defaultAlgorithm, darkAlgorithm] }}>
        <Demo />
      </ConfigProvider>,
    );
    expect(tokenRef?.colorPrimary).toBe('#177ddc');
  });

  it('overriding component token should work', () => {
    render(
      <ConfigProvider theme={{ override: { InputNumber: { handleWidth: 50.1234 } } }}>
        <InputNumber />
      </ConfigProvider>,
    );
    const dynamicStyles = Array.from(document.querySelectorAll('style[data-css-hash]')).map(
      item => item?.innerHTML ?? '',
    );
    expect(
      dynamicStyles.some(
        style => style.includes('.ant-input-number') && style.includes('width:50.1234px'),
      ),
    ).toBeTruthy();
  });
});
