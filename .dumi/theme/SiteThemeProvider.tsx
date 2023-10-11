import React, { useContext } from 'react';
import { theme as antdTheme, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import type { ThemeProviderProps } from 'antd-style';
import { ThemeProvider } from 'antd-style';
import SiteContext from './slots/SiteContext';

interface NewToken {
  bannerHeight: number;
  headerHeight: number;
  menuItemBorder: number;
  mobileMaxWidth: number;
  siteMarkdownCodeBg: string;
  antCls: string;
  iconCls: string;
  marginFarXS: number;
  marginFarSM: number;
  marginFar: number;
  codeFamily: string;
  contentMarginTop: number;
  anchorTop: number;
}

// 通过给 antd-style 扩展 CustomToken 对象类型定义，可以为 useTheme 中增加相应的 token 对象
declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends NewToken {}
}

const headerHeight = 64;
const bannerHeight = 38;

const SiteThemeProvider: React.FC<ThemeProviderProps<any>> = ({ children, theme, ...rest }) => {
  const { getPrefixCls, iconPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = antdTheme.useToken();
  const { bannerVisible } = useContext(SiteContext);
  React.useEffect(() => {
    ConfigProvider.config({ theme: theme as ThemeConfig });
  }, [theme]);

  return (
    <ThemeProvider<NewToken>
      {...rest}
      theme={theme}
      customToken={{
        headerHeight,
        bannerHeight,
        menuItemBorder: 2,
        mobileMaxWidth: 767.99,
        siteMarkdownCodeBg: token.colorFillTertiary,
        antCls: `.${rootPrefixCls}`,
        iconCls: `.${iconPrefixCls}`,
        /** 56 */
        marginFarXS: (token.marginXXL / 6) * 7,
        /** 80 */
        marginFarSM: (token.marginXXL / 3) * 5,
        /** 96 */
        marginFar: token.marginXXL * 2,
        codeFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
        contentMarginTop: 40,
        anchorTop: headerHeight + token.margin + (bannerVisible ? bannerHeight : 0),
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default SiteThemeProvider;
