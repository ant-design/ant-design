import type { FC } from 'react';
import React, { useContext } from 'react';
import { ConfigContext } from 'antd/es/config-provider';
import type { ThemeProviderProps } from 'antd-style';
import { ThemeProvider } from 'antd-style';
import { theme } from 'antd';

const SiteThemeProvider: FC<ThemeProviderProps> = ({ children, ...rest }) => {
  const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const { token } = theme.useToken();

  return (
    <ThemeProvider
      {...rest}
      customToken={{
        headerHeight: 64,
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
      }}
    >
      {children}
    </ThemeProvider>
  );
};

export default SiteThemeProvider;
