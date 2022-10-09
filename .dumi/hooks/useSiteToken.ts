import { theme } from 'antd';
import { useContext } from 'react';
import { ConfigContext } from 'antd/es/config-provider';

const { useToken } = theme;

const useSiteToken = () => {
  const result = useToken();
  const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = result;

  console.log('Site Token:', token);

  return {
    ...result,
    token: {
      ...token,
      headerHeight: 64,
      menuItemBorder: 2,
      mobileMaxWidth: 767.99,
      siteHeaderBoxShadow: '0 2px 8px rgba(240, 241, 242, 65',
      siteMarkdownCodeBg: '#f2f4f5',
      antCls: `.${rootPrefixCls}`,
      iconCls: `.${iconPrefixCls}`,
    },
  };
};

export default useSiteToken;
