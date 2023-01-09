import { useStyleRegister } from '@ant-design/cssinjs';
import type { UseTokenType } from '../wave';

export default function useStyle(tokenConfig: UseTokenType) {
  const [theme, token, hashId] = tokenConfig;

  useStyleRegister({ theme, token, hashId, path: ['Customize', 'Wave', 'Effect'] }, () => {
    const prefixCls = '.happy-wave';

    return [
      {
        [prefixCls]: {
          position: 'fixed',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
          background: 'green',

          [`${prefixCls}-dot`]: {
            position: 'absolute',
            left: 0,
            top: 0,
            width: 10,
            height: 10,
            background: 'red',
          },
        },
      },
    ];
  });
}
