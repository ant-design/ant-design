import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { StepsToken } from '.';

const genStepsVerticalStyle: GenerateStyle<StepsToken, CSSObject> = token => {
  const {
    componentCls,
    stepsSmallIconSize,
    stepsVerticalIconWidth,
    stepsVerticalTailWidth,
    stepsVerticalTailWidthSm,
    stepsIconSize,
  } = token;

  return {
    [`&${componentCls}-vertical`]: {
      display: 'flex',
      flexDirection: 'column',

      [`> ${componentCls}-item`]: {
        display: 'block',
        flex: '1 0 auto',
        paddingLeft: 0,
        overflow: 'visible',

        [`${componentCls}-item-icon`]: {
          float: 'left',
          marginRight: stepsVerticalIconWidth,
        },
        [`${componentCls}-item-content`]: {
          display: 'block',
          minHeight: 48,
          overflow: 'hidden',
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${stepsIconSize}px`,
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: 12,
        },
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: 'absolute',
        top: 0,
        insetInlineStart: stepsVerticalTailWidth,
        width: 1,
        height: '100%',
        padding: `${stepsIconSize + 6}px 0 6px`,

        '&::after': {
          width: 1,
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
          insetInlineStart: stepsVerticalTailWidthSm,
          padding: `${stepsSmallIconSize + 6}px 0 6px`,
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${stepsSmallIconSize}px`,
        },
      },
    },
  };
};
export default genStepsVerticalStyle;
