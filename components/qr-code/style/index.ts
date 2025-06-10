import { unit } from '@ant-design/cssinjs';
import { FastColor } from '@ant-design/fast-color';

import { resetComponent } from '../../style';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks, mergeToken } from '../../theme/internal';

// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

/**
 * @desc QRCode 组件的 Token
 * @descEN Token for QRCode component
 */
interface QRCodeToken extends FullToken<'QRCode'> {
  /**
   * @desc QRCode 文字颜色
   * @descEN Text color of QRCode
   */
  QRCodeTextColor: string;
  /**
   * @desc QRCode 遮罩背景颜色
   * @descEN Mask background color of QRCode
   */
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
  QRCodeMaskBackgroundColor: new FastColor(token.colorBgContainer).setA(0.96).toRgbString(),
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
