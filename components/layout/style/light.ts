import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { LayoutToken } from '.';

const genLayoutLightStyle: GenerateStyle<LayoutToken, CSSObject> = token => {
  const { componentCls, colorBgComponent, colorBgBody, colorText } = token;

  return {
    [`${componentCls}-sider-light`]: {
      background: colorBgComponent,

      [`${componentCls}-sider-trigger`]: {
        color: colorText,
        background: colorBgComponent,
      },

      [`${componentCls}-sider-zero-width-trigger`]: {
        color: colorText,
        background: colorBgComponent,
        border: `1px solid ${colorBgBody}`, // Safe to modify to any other color
        borderInlineStart: 0,
      },
    },
  };
};

export default genLayoutLightStyle;
