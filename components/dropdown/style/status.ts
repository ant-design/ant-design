import type { CSSObject } from '@ant-design/cssinjs';

import type { DropdownToken } from '.';
import type { GenerateStyle } from '../../theme/internal';

const genStatusStyle: GenerateStyle<DropdownToken, CSSObject> = (token) => {
  const { componentCls, menuCls, colorError, colorTextLightSolid } = token;

  const itemCls = `${menuCls}-item`;

  return {
    [`${componentCls}, ${componentCls}-menu-submenu`]: {
      [`${menuCls} ${itemCls}`]: {
        [`&${itemCls}-danger:not(${itemCls}-disabled)`]: {
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
