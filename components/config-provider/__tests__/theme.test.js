import ConfigProvider from '..';

describe('ConfigProvider.Theme', () => {
  it('Primary color', () => {
    ConfigProvider.config({
      prefixCls: 'bamboo',
      theme: {
        primaryColor: '#0000FF',
      },
    });

    const styles = [...document.querySelectorAll('style')];
    const themeStyle = styles.find(style => style['rc-util-key'].includes('-dynamic-theme'));
    expect(themeStyle).toBeTruthy();

    expect(themeStyle.innerHTML).toContain('--bamboo-primary-color: rgb(0, 0, 255)');
  });
});
