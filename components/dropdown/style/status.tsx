import type { GenerateStyle } from '../../_util/theme';
import type { DropdownToken } from '.';

const genStatusStyle: GenerateStyle<DropdownToken> = token => {
  const { componentCls, colorError, colorTextLightSolid } = token;

  return {
    [componentCls]: {
      [`${componentCls}-menu-item`]: {
        '&-danger': {
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
