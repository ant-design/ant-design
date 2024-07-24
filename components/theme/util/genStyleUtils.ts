import { useContext } from 'react';
import { genStyleUtils } from '@ant-design/cssinjs-utils';

import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type {
  AliasToken,
  ComponentTokenMap,
  SeedToken,
} from '../interface';

import localUseToken, { unitless } from '../useToken';
import useResetIconStyle from './useResetIconStyle';

export const {
  genStyleHooks,
  genComponentStyleHook,
  genSubStyleComponent,
} = genStyleUtils<
  ComponentTokenMap,
  AliasToken,
  SeedToken
>({
  usePrefix: () => {
    const { getPrefixCls, iconPrefixCls } = useContext(ConfigContext);

    const rootPrefixCls = getPrefixCls();

    return {
      rootPrefixCls,
      iconPrefixCls,
    }
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar] = localUseToken();

    return {
      theme,
      realToken,
      hashId,
      token,
      cssVar,
    };
  },
  useCSP: () => {
    const { csp, iconPrefixCls } = useContext(ConfigContext);

    // Generate style for icons
    useResetIconStyle(iconPrefixCls, csp);

    return csp ?? {};
  },
  getResetStyles: (token) =>
    [
      {
        // Link
        '&': genLinkStyle(token),
      },
    ]
  ,
  getCommonStyle: genCommonStyle,
  getCompUnitless: () => unitless as any,
})
