import ConfigProvider, { defaultPrefixCls, globalConfig } from '..';

describe('ConfigProvider.config', () => {
  it('rootPrefixCls', () => {
    expect(globalConfig().getRootPrefixCls()).toBe(defaultPrefixCls);

    ConfigProvider.config({
      prefixCls: 'light',
    });
    expect(globalConfig().getRootPrefixCls()).toBe('light');
  });
});
