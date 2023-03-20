import type { CSSObject } from '@ant-design/cssinjs';
import type { StepsToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStepsVerticalStyle: GenerateStyle<StepsToken, CSSObject> = (token) => {
  const { componentCls, stepsSmallIconSize, stepsIconSize } = token;

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
          lineHeight: `${stepsIconSize}px`,
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: token.paddingSM,
        },
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: token.stepsIconSize / 2 - token.lineWidth,
        width: token.lineWidth,
        height: '100%',
        padding: `${stepsIconSize + token.marginXXS * 1.5}px 0 ${token.marginXXS * 1.5}px`,

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
          insetInlineStart: token.stepsSmallIconSize / 2 - token.lineWidth,
          padding: `${stepsSmallIconSize + token.marginXXS * 1.5}px 0 ${token.marginXXS * 1.5}px`,
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${stepsSmallIconSize}px`,
        },
      },
    },
  };
};
export default genStepsVerticalStyle;
