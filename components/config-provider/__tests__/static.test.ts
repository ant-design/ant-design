import ConfigProvider, { globalConfig } from '..';

describe('ConfigProvider.config', () => {
  it('rootPrefixCls', () => {
    expect(globalConfig().getRootPrefixCls()).toEqual('ant');

    ConfigProvider.config({
      prefixCls: 'light',
    });
    expect(globalConfig().getRootPrefixCls()).toEqual('light');
  });

  it('theme', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(globalConfig().getTheme()).toBeFalsy();

    ConfigProvider.config({
      theme: {
        infoColor: 'red',
      },
    });

    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: ConfigProvider] `config` of css variable theme is not work in v5. Please use new `theme` config instead.',
    );

    ConfigProvider.config({
      theme: {
        token: {},
      },
    });

    expect(globalConfig().getTheme()).toEqual({ token: {} });
  });
});
