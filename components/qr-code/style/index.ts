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

export default genComponentStyleHook<'QrCode'>('QrCode', (token) => genQrCodeStyle(token));
