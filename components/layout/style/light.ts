import type { CSSObject } from '@ant-design/cssinjs';
import type { LayoutToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genLayoutLightStyle: GenerateStyle<LayoutToken, CSSObject> = (token) => {
  const { componentCls, bodyBg, lightSiderBg, lightTriggerBg, lightTriggerColor } = token;

  return {
    [`${componentCls}-sider-light`]: {
      background: lightSiderBg,

      [`${componentCls}-sider-trigger`]: {
        color: lightTriggerColor,
        background: lightTriggerBg,
      },

      [`${componentCls}-sider-zero-width-trigger`]: {
        color: lightTriggerColor,
        background: lightTriggerBg,
        border: `1px solid ${bodyBg}`, // Safe to modify to any other color
        borderInlineStart: 0,
      },
    },
  };
};

export default genLayoutLightStyle;
