import { useStyleRegister } from '@ant-design/cssinjs';

import type { CSPConfig } from '../../config-provider';
import { genIconStyle } from '../../style';
import useToken from '../useToken';

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
