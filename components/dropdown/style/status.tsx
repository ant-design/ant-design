import type { GenerateStyle } from '../../_util/theme';
import type { DropdownToken } from '.';

const genStatusStyle: GenerateStyle<DropdownToken> = token => {
  const { componentCls, menuCls, colorError, colorTextLightSolid } = token;

  const itemCls = `${menuCls}-item`;

  return {
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [`${menuCls} ${itemCls}`]: {
        [`&${itemCls}-danger`]: {
          color: colorError,

          '&:hover': {
            color: colorTextLightSolid,
            backgroundColor: colorError,
          },
        },
      },
    },
  };
};

export default genStatusStyle;
