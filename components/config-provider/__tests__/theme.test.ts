import { kebabCase } from 'lodash';
import ConfigProvider from '..';

describe('ConfigProvider.Theme', () => {
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
});
