import { useContext } from 'react';
import { genStyleUtils } from '@ant-design/cssinjs-utils';
import type { GetCompUnitless } from '@ant-design/cssinjs-utils/es/util/genStyleUtils';

import { ConfigContext } from '../../config-provider/context';
import { genCommonStyle, genLinkStyle } from '../../style';
import type { AliasToken, ComponentTokenMap, SeedToken } from '../interface';
import useLocalToken, { unitless } from '../useToken';
import { genIconStyle } from './useResetIconStyle';

export const { genStyleHooks, genComponentStyleHook, genSubStyleComponent } = genStyleUtils<
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
    };
  },
  useToken: () => {
    const [theme, realToken, hashId, token, cssVar] = useLocalToken();
    return { theme, realToken, hashId, token, cssVar };
  },
  useCSP: () => {
    const { csp } = useContext(ConfigContext);
    return csp ?? {};
  },
  getResetStyles: (token) => [{ '&': genLinkStyle(token) }, genIconStyle()],
  getCommonStyle: genCommonStyle,
  getCompUnitless: (() => unitless) as GetCompUnitless<ComponentTokenMap, AliasToken>,
});
