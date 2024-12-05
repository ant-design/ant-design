import { useStyleRegister } from '@ant-design/cssinjs';
import type { CSSObject } from '@ant-design/cssinjs';

import { defaultIconPrefixCls } from '../../config-provider';
import type { CSPConfig } from '../../config-provider';
import { resetIcon } from '../../style';
import useToken from '../useToken';

export const genIconStyle = (iconPrefixCls = defaultIconPrefixCls): CSSObject => ({
  [`.${iconPrefixCls}`]: {
    ...resetIcon(),
    [`.${iconPrefixCls} .${iconPrefixCls}-icon`]: {
      display: 'block',
    },
  },
});

const useResetIconStyle = (iconPrefixCls: string, csp?: CSPConfig) => {
  const [theme, token] = useToken();

  // Generate style for icons
  return useStyleRegister(
    {
      theme,
      token,
      hashId: '',
      path: ['ant-design-icons', iconPrefixCls],
      nonce: () => csp?.nonce!,
      layer: {
        name: 'antd',
      },
    },
    () => [genIconStyle(iconPrefixCls)],
  );
};

export default useResetIconStyle;
