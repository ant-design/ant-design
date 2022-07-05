// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../theme';

export interface ComponentToken {
  // FIXME: need to be removed
  bgColor: string;
  bgColorHover: string;
  bgColorSelected: string;
}

interface SegmentedToken extends FullToken<'Segmented'> {
  segmentedPaddingHorizontal: number;
  segmentedPaddingHorizontalSM: number;
  segmentedContainerPadding: number;
  labelColor: string;
  labelColorHover: string;
}

// ============================== Mixins ==============================
function segmentedDisabledItem(cls: string, token: SegmentedToken): CSSObject {
  return {
    [`${cls}, ${cls}:hover, ${cls}:focus`]: {
      color: token.colorTextDisabled,
      cursor: 'not-allowed',
    },
  };
}

function getSegmentedItemSelectedStyle(token: SegmentedToken): CSSObject {
  return {
    backgroundColor: token.bgColorSelected,
    borderRadius: token.controlRadius,
    boxShadow: token.boxShadowSegmentedSelectedItem,
  };
}

const segmentedTextEllipsisCss: CSSObject = {
  overflow: 'hidden',
  // handle text ellipsis
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'keep-all',
};

// ============================== Styles ==============================
const genSegmentedStyle: GenerateStyle<SegmentedToken> = (token: SegmentedToken) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      ...resetComponent(token),

      display: 'inline-block',
      padding: token.segmentedContainerPadding,
      color: token.labelColor,
      backgroundColor: token.bgColor,
      borderRadius: token.radiusBase,
      transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,

      [`${componentCls}-group`]: {
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
        justifyItems: 'flex-start',
        width: '100%',
      },

      // RTL styles
      '&&-rtl': {
        direction: 'rtl',
      },

      // hover/focus styles
      [`&:not(${componentCls}-disabled)`]: {
        '&:hover, &:focus': {
          backgroundColor: token.bgColorHover,
        },
      },

      // block styles
      '&&-block': {
        display: 'flex',
      },

      [`&&-block ${componentCls}-item`]: {
        flex: 1,
        minWidth: 0,
      },

      // item styles
      [`${componentCls}-item`]: {
        position: 'relative',
        textAlign: 'center',
        cursor: 'pointer',
        transition: `color ${token.motionDurationSlow} ${token.motionEaseInOut}`,

        '&-selected': {
          ...getSegmentedItemSelectedStyle(token),
          color: token.labelColorHover,
        },

        '&:hover, &:focus': {
          color: token.labelColorHover,
        },

        '&-label': {
          minHeight: token.controlHeight - token.segmentedContainerPadding * 2,
          lineHeight: `${token.controlHeight - token.segmentedContainerPadding * 2}px`,
          padding: `0 ${token.segmentedPaddingHorizontal}px`,
          ...segmentedTextEllipsisCss,
        },

        // syntactic sugar to add `icon` for Segmented Item
        '&-icon + *': {
          marginInlineEnd: token.marginSM / 2,
        },

        '&-input': {
          position: 'absolute',
          insetBlockStart: 0,
          insetInlineStart: 0,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
        },
      },

      // size styles
      [`&&-lg ${componentCls}-item-label`]: {
        minHeight: token.controlHeightLG - token.segmentedContainerPadding * 2,
        lineHeight: `${token.controlHeightLG - token.segmentedContainerPadding * 2}px`,
        padding: `0 ${token.segmentedPaddingHorizontal}px`,
        fontSize: token.fontSizeLG,
      },

      [`&&-sm ${componentCls}-item-label`]: {
        minHeight: token.controlHeightSM - token.segmentedContainerPadding * 2,
        lineHeight: `${token.controlHeightSM - token.segmentedContainerPadding * 2}px`,
        padding: `0 ${token.segmentedPaddingHorizontalSM}px`,
      },

      // disabled styles
      ...segmentedDisabledItem(`&-disabled ${componentCls}-item`, token),
      ...segmentedDisabledItem(`${componentCls}-item-disabled`, token),

      // thumb styles
      [`${componentCls}-thumb`]: {
        ...getSegmentedItemSelectedStyle(token),

        position: 'absolute',
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: 0,
        height: '100%',
        padding: `${token.paddingXXS}px 0`,
      },

      // transition effect when `appear-active`
      [`${componentCls}-thumb-motion-appear-active`]: {
        transition: `transform ${token.motionDurationSlow} ${token.motionEaseInOut}, width ${token.motionDurationSlow} ${token.motionEaseInOut}`,
        willChange: 'transform, width',
      },
    },
  };
};

// ============================== Export ==============================
export default genComponentStyleHook(
  'Segmented',
  token => {
    const { lineWidthBold, controlLineWidth, colorTextLabel, colorText } = token;

    const segmentedToken = mergeToken<SegmentedToken>(token, {
      segmentedPaddingHorizontal: token.controlPaddingHorizontal - controlLineWidth,
      segmentedPaddingHorizontalSM: token.controlPaddingHorizontalSM - controlLineWidth,
      segmentedContainerPadding: lineWidthBold,
      labelColor: colorTextLabel,
      labelColorHover: colorText,
    });
    return [genSegmentedStyle(segmentedToken)];
  },
  ({ segmentedBgColor, segmentedBgColorActive, segmentedBgColorHover }) => ({
    bgColor: segmentedBgColor,
    bgColorHover: segmentedBgColorHover,
    bgColorSelected: segmentedBgColorActive,
  }),
);
