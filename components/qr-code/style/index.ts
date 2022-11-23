import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook } from '../../theme';
import { resetComponent } from '../../style';

interface QrCodeToken extends FullToken<'QrCode'> {}

const genQrCodeStyle: GenerateStyle<QrCodeToken> = (token) => {
  const { componentCls } = token;
  return {
    [componentCls]: {
      ...resetComponent?.(token),
      position: 'relative',
      width: '100%',
      height: '100%',
      '&-icon': {
        marginBlockEnd: 8,
        fontSize: '32px',
      },
    },
  };
};

export default genComponentStyleHook<'QrCode'>('QrCode', genQrCodeStyle);
