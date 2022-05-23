// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { GenerateStyle, FullToken } from '../../_util/theme';
import { resetComponent, genComponentStyleHook, mergeToken } from '../../_util/theme';

export interface ComponentToken {}

interface SegmentedToken extends FullToken<'Segmented'> {
  segmentedBg: string;
  segmentedHoverBg: string;
  segmentedSelectedBg: string;
  segmentedLabelColor: string;
  segmentedLabelHoverColor: string;
  segmentedPaddingVertical: number;
  segmentedPaddingVerticalLG: number;
  segmentedPaddingVerticalSM: number;
  segmentedPaddingHorizontal: number;
  segmentedPaddingHorizontalSM: number;
  segmentedContainerPadding: number;
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

// FIXME: hard code
const segmentedSelectedItemBoxShadow = [
  `0 2px 8px -2px ${new TinyColor('#000').setAlpha(0.05).toRgbString()}`,
  `0 1px 4px -1px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
  `0 0 1px 0 ${new TinyColor('#000').setAlpha(0.08).toRgbString()}`,
].join(',');

function getSegmentedItemSelectedStyle(token: SegmentedToken): CSSObject {
  return {
    backgroundColor: token.segmentedSelectedBg,
    borderRadius: token.controlRadius,
    boxShadow: segmentedSelectedItemBoxShadow,
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
      color: token.segmentedLabelColor,
      backgroundColor: token.segmentedBg,
      borderRadius: token.radiusBase,
      transition: `all ${token.motionDurationSlow} ${token.motionEaseInOut}`,

      '&-group': {
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
          backgroundColor: token.segmentedHoverBg,
        },
      },

      // block styles
      '&&-block': {
        display: 'flex',
      },

      '&&-block &-item': {
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
          color: token.segmentedLabelHoverColor,
        },

        '&:hover, &:focus': {
          color: token.segmentedLabelHoverColor,
        },

        '&-label': {
          // FIXME: hard code
          minHeight: token.controlHeight - token.segmentedContainerPadding * 2,
          lineHeight: `${token.controlHeight - token.segmentedContainerPadding * 2}px`,
          padding: `0 ${token.segmentedPaddingHorizontal}px`,
          ...segmentedTextEllipsisCss,
        },

        // syntactic sugar to add `icon` for Segmented Item
        '&-icon + *': {
          // FIXME: hard code
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
        // FIXME: hard code
        minHeight: token.controlHeightLG - token.segmentedContainerPadding * 2,
        lineHeight: `${token.controlHeightLG - token.segmentedContainerPadding * 2}px`,
        padding: `0 ${token.segmentedPaddingHorizontal}px`,
        fontSize: token.fontSizeLG,
      },

      [`&&-sm ${componentCls}-item-label`]: {
        // FIXME: hard code
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
export default genComponentStyleHook('Segmented', token => {
  const segmentedToken = mergeToken<SegmentedToken>(token, {
    // FIXME: hard code
    segmentedBg: new TinyColor('#000').setAlpha(0.04).toRgbString(),
    // FIXME: hard code
    segmentedHoverBg: new TinyColor('#000').setAlpha(0.06).toRgbString(),
    // FIXME: hard code
    segmentedSelectedBg: '#fff',
    // FIXME: hard code
    segmentedLabelColor: new TinyColor('#000').setAlpha(0.65).toRgbString(),
    // FIXME: hard code
    segmentedLabelHoverColor: '#262626',
    segmentedPaddingVertical: Math.max(
      Math.round(((token.controlHeight - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.controlLineWidth,
      3,
    ),
    segmentedPaddingVerticalLG:
      Math.ceil(((token.controlHeightLG - token.fontSizeLG * token.lineHeight) / 2) * 10) / 10 -
      token.controlLineWidth,
    segmentedPaddingVerticalSM: Math.max(
      Math.round(((token.controlHeightSM - token.fontSize * token.lineHeight) / 2) * 10) / 10 -
        token.controlLineWidth,
      0,
    ),
    segmentedPaddingHorizontal: token.controlPaddingHorizontal - token.controlLineWidth,
    segmentedPaddingHorizontalSM: token.controlPaddingHorizontalSM - token.controlLineWidth,
    // FIXME: hard code
    segmentedContainerPadding: token.paddingXXS / 2,
  });
  return [genSegmentedStyle(segmentedToken)];
});
