import { unit } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

export interface ComponentToken {}

interface QRCodeToken extends FullToken<'QRCode'> {
  QRCodeTextColor: string;
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
        [`& > ${componentCls}-expired, & > ${componentCls}-scanned`]: {
          color: token.QRCodeTextColor,
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
      padding: 0,
      borderRadius: 0,
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'QRCode'> = (token) => ({
  QRCodeMaskBackgroundColor: new TinyColor(token.colorBgContainer).setAlpha(0.96).toRgbString(),
});

export default genStyleHooks<'QRCode'>(
  'QRCode',
  (token) => {
    const mergedToken = mergeToken<QRCodeToken>(token, {
      QRCodeTextColor: token.colorText,
    });

    return genQRCodeStyle(mergedToken);
  },
  prepareComponentToken,
);
