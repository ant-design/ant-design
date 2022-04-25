import type { CSSObject } from '@ant-design/cssinjs';
import type { GenerateStyle } from '../../_util/theme';
import type { LayoutToken } from '.';

const genLayoutLightStyle: GenerateStyle<LayoutToken, CSSObject> = token => {
  const {
    componentCls,
    layoutSiderBackgroundLight,
    layoutTriggerBackgroundLight,
    layoutTriggerColorLight,
  } = token;

  return {
    [`&${componentCls}-sider-light`]: {
      background: layoutSiderBackgroundLight,
      [`${componentCls}-sider-trigger`]: {
        color: layoutTriggerColorLight,
        background: layoutTriggerBackgroundLight,
      },
      [`${componentCls}-sider-zero-width-trigger`]: {
        color: layoutTriggerColorLight,
        background: layoutTriggerBackgroundLight,
      },
    },
  };
};

export default genLayoutLightStyle;
