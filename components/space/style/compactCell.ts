import type { FullToken, GenerateStyle } from '../../theme/internal';

interface SpaceToken extends FullToken<'Space'> {
  // Custom token here
}

const genSpaceCompactCellStyle: GenerateStyle<SpaceToken> = (token) => {
  const {
    componentCls,
    borderRadius,
    paddingSM,
    colorBorder,
    paddingXS,
    fontSizeLG,
    fontSizeSM,
    borderRadiusLG,
    borderRadiusSM,
  } = token;

  return {
    [componentCls]: {
      '&-compactCell': {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0,
        paddingInline: paddingSM,
        margin: 0,
        background: 'transparent',
        border: `1px solid ${colorBorder}`,
        fontSize: 'inherit',
        borderRadius,
        '&::before,&::after': {
          display: 'none',
        },
        '&-large': {
          fontSize: fontSizeLG,
          borderRadius: borderRadiusLG,
        },
        '&-small': {
          paddingInline: paddingXS,
          borderRadius: borderRadiusSM,
          fontSize: fontSizeSM,
        },
        '&-vertical': {
          flexDirection: 'column',
        },
        '&-block': {
          display: 'flex',
          width: '100%',
        },
        '&-compact-first-item': {
          borderInlineEnd: 'none',
          borderStartEndRadius: 0,
          borderEndEndRadius: 0,
        },
        '&-compact-last-item': {
          borderInlineStart: 'none',
          borderStartStartRadius: 0,
          borderEndStartRadius: 0,
        },
        '&-compact-middle-item': {
          borderRadius: 0,
          borderInlineEnd: 'none',
        },
        '&-compact-vertical-first-item': {
          borderBottom: 'none',
          borderEndStartRadius: 0,
          borderEndEndRadius: 0,
        },
        '&-compact-vertical-last-item': {
          borderTop: 'none',
          borderStartStartRadius: 0,
          borderStartEndRadius: 0,
        },
        '&-compact-vertical-middle-item': {
          borderBottom: 'none',
          borderRadius: 0,
        },
      },
    },
  };
};

// ============================== Export ==============================
export default genSpaceCompactCellStyle;
