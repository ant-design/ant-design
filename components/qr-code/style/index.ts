import type { TechUIToken } from '../../style/useStyle';
import { resetComponent } from '../../style/useStyle';
import { useTechUIStyle } from '../../style/useStyle';

import type { GenerateStyle } from 'antd/es/theme';

const genTecUIStyle: GenerateStyle<TechUIToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      ...resetComponent?.(token),
      position: 'relative',
      width: '100%',
      height: '100%',

      '&-mask': {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: '4',
        display: 'block',
        width: '100%',
        height: '100%',
        color: '#000',
        lineHeight: '1.5',
        textAlign: 'center',
        backgroundColor: 'white',
        opacity: '0.94',
      },

      '&-icon': {
        marginBlockEnd: 8,
        fontSize: '32px',
      },
    },
  };
};

export default function useStyle(prefixCls: string) {
  return useTechUIStyle('QrCode', (token) => {
    const techUiToken: TechUIToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };

    return [genTecUIStyle(techUiToken)];
  });
}
