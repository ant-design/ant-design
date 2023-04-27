import type { DropdownToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStatusStyle: GenerateStyle<DropdownToken> = (token) => {
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
