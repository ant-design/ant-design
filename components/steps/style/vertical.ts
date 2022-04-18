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
        paddingInlineStart: 0, // FIXME: hardcode in v4
        overflow: 'visible',

        [`${componentCls}-item-icon`]: {
          float: 'left',
          marginInlineEnd: stepsVerticalIconWidth,
        },
        [`${componentCls}-item-content`]: {
          display: 'block',
          minHeight: 48, // FIXME: hardcode in v4
          overflow: 'hidden',
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${stepsIconSize}px`,
        },
        [`${componentCls}-item-description`]: {
          paddingBottom: 12, // FIXME: hardcode in v4
        },
      },
      [`> ${componentCls}-item > ${componentCls}-item-container > ${componentCls}-item-tail`]: {
        position: 'absolute',
        top: 0, // FIXME: hardcode in v4
        insetInlineStart: stepsVerticalTailWidth,
        width: 1, // FIXME: hardcode in v4
        height: '100%', // FIXME: hardcode in v4
        padding: `${stepsIconSize + 6}px 0 6px`, // FIXME: hardcode in v4

        '&::after': {
          width: 1, // FIXME: hardcode in v4
          height: '100%', // FIXME: hardcode in v4
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
          top: 0, // FIXME: hardcode in v4
          insetInlineStart: stepsVerticalTailWidthSm,
          padding: `${stepsSmallIconSize + 6}px 0 6px`, // FIXME: hardcode in v4
        },
        [`${componentCls}-item-title`]: {
          lineHeight: `${stepsSmallIconSize}px`,
        },
      },
    },
  };
};
export default genStepsVerticalStyle;
