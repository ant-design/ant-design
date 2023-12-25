import { unit } from '@ant-design/cssinjs';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface QRCodeToken extends FullToken<'QRCode'> {
  QRCodeExpiredTextColor: string;
  QRCodeMaskBackgroundColor: string;
}

const genQRCodeStyle: GenerateStyle<QRCodeToken> = (token) => {
  const { componentCls, lineWidth, lineType, colorSplit } = token;
  return {
    [componentCls]: {
      ...resetComponent(token),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: token.paddingSM,
      backgroundColor: token.colorWhite,
      borderRadius: token.borderRadiusLG,
      border: `${unit(lineWidth)} ${lineType} ${colorSplit}`,
      position: 'relative',
      overflow: 'hidden',

      [`& > ${componentCls}-mask`]: {
        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        color: token.colorText,
        lineHeight: token.lineHeight,
        background: token.QRCodeMaskBackgroundColor,
        textAlign: 'center',
        [`& > ${componentCls}-expired`]: {
          color: token.QRCodeExpiredTextColor,
        },
      },

      '> canvas': {
        alignSelf: 'stretch',
        flex: 'auto',
        minWidth: 0,
      },

      '&-icon': {
        marginBlockEnd: token.marginXS,
        fontSize: token.controlHeight,
      },
    },
    [`${componentCls}-borderless`]: {
      borderColor: 'transparent',
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'QRCode'> = () => ({});

export default genStyleHooks<'QRCode'>(
  'QRCode',
  (token) => {
    const mergedToken = mergeToken<QRCodeToken>(token, {
      QRCodeExpiredTextColor: 'rgba(0, 0, 0, 0.88)',
      QRCodeMaskBackgroundColor: 'rgba(255, 255, 255, 0.96)',
    });
    return genQRCodeStyle(mergedToken);
  },
  prepareComponentToken,
);
