// import '../../style/index.less';
// import './index.less';

// // style dependencies
// import '../../button/style';

// deps-lint-skip-all
import * as React from 'react';
import { CSSObject } from '@ant-design/cssinjs';
import {
  GenerateStyle,
  resetComponent,
  FullToken,
  genComponentStyleHook,
  mergeToken,
} from '../../_util/theme';

export interface ComponentToken {
  zIndexDropdown: number;
}

interface DropdownToken extends FullToken<'Dropdown'> {}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<DropdownToken> = token => {
  const { componentCls, zIndexDropdown, antCls, iconCls, motionDurationMid } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      position: 'absolute',
      top: -9999,
      left: -9999,
      zIndex: zIndexDropdown,
      display: 'block',

      // A placeholder out of dropdown visible range to avoid close when user moving
      '&::before': {
        position: 'absolute',
        inset: `-4px 0 -4px -7px`, // FIXME: deps on the Tooltip arrow size
        zIndex: -9999,
        opacity: 0.0001,
        content: '""',
      },

      [`${componentCls}-wrap`]: {
        position: 'relative',

        [`${antCls}-btn > ${iconCls}-down`]: {
          fontSize: 10,
        },

        [`${iconCls}-down::before`]: {
          transition: `transform ${motionDurationMid}`,
        },
      },

      [`${componentCls}-wrap-open`]: {
        [`${iconCls}-down::before`]: {
          transform: `rotate(180deg)`,
        },
      },

      [`
        &-hidden,
        &-menu-hidden,
        &-menu-submenu-hidden
      `]: {
        display: 'none',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Dropdown',
  token => {
    const dropdownToken = mergeToken<DropdownToken>(token, {});
    return [genBaseStyle(dropdownToken)];
  },
  token => ({
    zIndexDropdown: token.zIndexPopup + 50,
  }),
);
