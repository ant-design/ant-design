import { kebabCase } from 'lodash';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import ConfigProvider from '..';
import { resetWarned } from '../../_util/warning';

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
        theme: { [colorName]: '#0000FF' },
      });

      const styles: HTMLStyleElement[] = Array.from(document.querySelectorAll('style'));
      const themeStyle = styles.find(style =>
        style.getAttribute('rc-util-key')?.includes('-dynamic-theme'),
      );
      expect(themeStyle).toBeTruthy();

      expect(themeStyle?.innerHTML).toContain(`--bamboo-${kebabCase(colorName)}: rgb(0, 0, 255)`);
    });
  });

  it('should generate the same css variable as less algorithm', () => {
    const prefixCls = 'test';
    const infoColor = {
      hover: '#40a9ff',
      active: '#096dd9',
      deprecatedBg: '#e6f7ff',
      deprecatedBorder: '#91d5ff',
    };

    ConfigProvider.config({
      prefixCls,
      theme: {
        infoColor: '#1890ff',
      },
    });

    const styles = Array.from(document.querySelectorAll('style'));
    const themeStyle = styles.find(style =>
      style.getAttribute('rc-util-key')?.includes('-dynamic-theme'),
    );

    Object.keys(infoColor).forEach((key: keyof typeof infoColor) => {
      expect(themeStyle?.innerHTML).toContain(
        `--${prefixCls}-info-color-${kebabCase(key)}: ${infoColor[key]}`,
      );
    });
  });

  it('warning for SSR', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    mockCanUseDom = false;
    expect(canUseDom()).toBeFalsy();

    ConfigProvider.config({ theme: {} });

    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] SSR do not support dynamic theme with css variables.',
    );
    errorSpy.mockRestore();
  });
});
