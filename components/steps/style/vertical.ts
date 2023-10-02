import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, iconSizeSM, iconSize } = token;

  return {
    [`&${componentCls}-vertical`]: {
      display: 'flex',
      flexDirection: 'column',

      [`> ${componentCls}-item`]: {
        display: 'block',
        flex: '1 0 auto',
        paddingInlineStart: 0,
        overflow: 'visible',

        [`${componentCls}-item-icon`]: {
          float: 'left',
          marginInlineEnd: token.margin,
        },
        [`${componentCls}-item-content`]: {
          display: 'block',
          minHeight: token.controlHeight * 1.5,
          overflow: 'hidden',
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${iconSize}px`,
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: token.paddingSM,
        },
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: iconSize / 2 - token.lineWidth,
        width: token.lineWidth,
        height: '100%',
        padding: `${iconSize + token.marginXXS * 1.5}px 0 ${token.marginXXS * 1.5}px`,

        '&::after': {
          width: token.lineWidth,
          height: '100%',
        },
      },
      [`> ${componentCls}-item:not(:last-child) > ${componentCls}-item-container > ${componentCls}-item-tail`]:
        {
          display: 'block',
        },
      [` > ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-content > ${componentCls}-item-title`]:
        {
          '&::after': {
            display: 'none',
          },
        },
      [`&${componentCls}-small ${componentCls}-item-container`]: {
        [`${componentCls}-item-tail`]: {
          position: 'absolute',
          top: 0,
          insetInlineStart: iconSizeSM / 2 - token.lineWidth,
          padding: `${iconSizeSM + token.marginXXS * 1.5}px 0 ${token.marginXXS * 1.5}px`,
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${iconSizeSM}px`,
        },
      },
    },
  };
};
export default genStepsVerticalStyle;
