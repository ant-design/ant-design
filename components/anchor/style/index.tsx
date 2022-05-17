// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';
import type { GenerateStyle, FullToken } from '../../_util/theme';

export interface ComponentToken {}
interface AnchorToken extends FullToken<'Anchor'> {
  anchorLinkTop: number;
  anchorLinkLeft: number;
}

// ============================== Shared ==============================
const genSharedAnchorStyle: GenerateStyle<AnchorToken> = (token): CSSObject => {
  const { componentCls } = token;

  return {
    [`${componentCls}-wrapper`]: {
      // FIX ME
      marginBlockStart: -4,
      // FIX ME
      paddingBlockStart: 4,

      // delete overflow: auto
      // overflow: 'auto',

      // @anchor-bg
      backgroundColor: 'transparent',

      [componentCls]: {
        ...resetComponent(token),
        position: 'relative',
        // FIX ME @anchor-border-width
        paddingInlineStart: 2,

        [`${componentCls}-ink`]: {
          position: 'absolute',
          // top: 0
          insetBlockStart: 0,
          // left: 0
          insetInlineStart: 0,
          height: '100%',

          '&::before': {
            position: 'relative',
            display: 'block',
            // FIX ME
            width: 2,
            height: '100%',
            margin: '0 auto',
            // FIX ME @border-color-split
            backgroundColor: 'rgba(0, 0, 0, 0.06)',
            content: '" "',
          },
        },

        [`${componentCls}-ink-ball`]: {
          position: 'absolute',
          // left 50%
          insetInlineStart: '50%',
          display: 'none',
          // FIX ME
          width: 8,
          // FIX ME
          height: 8,
          // FIX '@component-background'
          backgroundColor: '#fff',
          border: `2px solid ${token.colorPrimary}`,
          borderRadius: 8,
          transform: 'translateX(-50%)',
          transition: `top ${token.motionDurationSlow} ease-in-out`,

          '&.visible': {
            display: 'inline-block',
          },
        },

        [`${componentCls}-link`]: {
          // FIX ME @anchor-link-padding
          paddingBlock: token.anchorLinkTop,
          paddingInline: `${token.anchorLinkLeft}px 0`,
          lineHeight: '1.143',

          '&-title': {
            position: 'relative',
            display: 'block',
            // FIX ME margin-bottom
            marginBlockEnd: 6,
            overflow: 'hidden',
            color: token.colorText,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            transition: `all ${token.motionDurationSlow}s`,

            '&:only-child': {
              marginBlockEnd: 0,
            },
          },

          [`&-active > ${componentCls}-link-title`]: {
            color: token.colorPrimary,
          },

          // link link
          [`${componentCls}-link`]: {
            paddingBlock: 5,
          },
        },
      },

      [`${componentCls}-fixed ${componentCls}-ink ${componentCls}-ink-ball`]: {
        display: 'none',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook('Anchor', token => {
  const anchorToken = mergeToken<AnchorToken>(token, {
    anchorLinkTop: 7,
    anchorLinkLeft: 16,
  });
  return [genSharedAnchorStyle(anchorToken)];
});
