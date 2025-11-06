import ConfigProvider, { defaultPrefixCls, globalConfig } from '..';

describe('ConfigProvider.config', () => {
  it('rootPrefixCls', () => {
    expect(globalConfig().getRootPrefixCls()).toEqual(defaultPrefixCls);

    ConfigProvider.config({
      prefixCls: 'light',
    });
    expect(globalConfig().getRootPrefixCls()).toEqual('light');
  });
});
