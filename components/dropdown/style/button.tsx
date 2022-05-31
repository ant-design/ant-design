import type { GenerateStyle } from '../../_util/theme';
import type { DropdownToken } from '.';

const genButtonStyle: GenerateStyle<DropdownToken> = token => {
  const { componentCls, antCls, paddingXS, colorLoadingOpacity } = token;

  return {
    [`${componentCls}-button`]: {
      whiteSpace: 'nowrap',

      [`&${antCls}-btn-group > ${antCls}-btn`]: {
        [`&-loading, &-loading + ${antCls}-btn`]: {
          cursor: 'default',
          pointerEvents: 'none',
          opacity: colorLoadingOpacity,
        },

        [`&:last-child:not(:first-child):not(${antCls}-btn-icon-only)`]: {
          paddingInline: paddingXS,
        },
      },
    },
  };
};

export default genButtonStyle;
