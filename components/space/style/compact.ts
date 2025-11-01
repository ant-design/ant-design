import { genCompactItemStyle } from '../../style/compact-item';
import { genStyleHooks } from '../../theme/internal';
import type { FullToken, GenerateStyle } from '../../theme/internal';

/** Component only token. Which will handle additional calculation of alias token */
// biome-ignore lint/suspicious/noEmptyInterface: ComponentToken need to be empty by default
export interface ComponentToken {}

interface SpaceToken extends FullToken<'Space'> {
  // Custom token here
}

const genSpaceCompactStyle: GenerateStyle<SpaceToken> = (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-flex',

      '&-block': {
        display: 'flex',
        width: '100%',
      },
      '&-vertical': {
        flexDirection: 'column',
      },

      '&-rtl': {
        direction: 'rtl',
      },
    },
  };
};

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
    colorBgContainerDisabled,
    lineWidth,
  } = token;

  const cellCls = `${componentCls}-cell`;

  return {
    [componentCls]: [
      {
        [cellCls]: {
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          paddingInline: paddingSM,
          margin: 0,
          background: colorBgContainerDisabled,
          borderWidth: lineWidth,
          borderStyle: 'solid',
          borderColor: colorBorder,
          borderRadius,

          '&-large': {
            fontSize: fontSizeLG,
            borderRadius: borderRadiusLG,
          },
          '&-small': {
            paddingInline: paddingXS,
            borderRadius: borderRadiusSM,
            fontSize: fontSizeSM,
          },
        },
      },

      genCompactItemStyle(token, {
        focus: false,
        componentCls: cellCls,
      }),
    ],
  };
};

// ============================== Export ==============================
export default genStyleHooks(
  ['Space', 'Compact'],
  (token) => [genSpaceCompactStyle(token), genSpaceCompactCellStyle(token)],
  () => ({}),
  {
    // Space component don't apply extra font style
    // https://github.com/ant-design/ant-design/issues/40315
    resetStyle: false,
  },
);
