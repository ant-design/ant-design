import type { GenerateStyle } from '../../_util/theme';
import type { DropdownToken } from '.';

const genDarkStyle: GenerateStyle<DropdownToken> = token => {
  const { componentCls } = token;

  return {
    // FIXME: Confirm usage
    // https://github.com/ant-design/ant-design/issues/4903
    [`${componentCls}-menu-dark`]: {
      //   &,
      //   ${componentCls}-menu {
      //     background: @menu-dark-bg;
      //   }
      //   ${componentCls}-menu-item,
      //   ${componentCls}-menu-submenu-title,
      //   ${componentCls}-menu-item > a,
      //   ${componentCls}-menu-item > .@{iconfont-css-prefix} + span > a {
      //     color: @text-color-secondary-dark;
      //     ${componentCls}-menu-submenu-arrow::after {
      //       color: @text-color-secondary-dark;
      //     }
      //     &:hover {
      //       color: @text-color-inverse;
      //       background: transparent;
      //     }
      //   }
      //   ${componentCls}-menu-item-selected {
      //     &,
      //     &:hover,
      //     > a {
      //       color: @text-color-inverse;
      //       background: @primary-color;
      //     }
      //   }
    },
  };
};

export default genDarkStyle;
