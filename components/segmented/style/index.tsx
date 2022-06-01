// deps-lint-skip-all
import type { CSSObject } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { FullToken, GenerateStyle } from '../../_util/theme';
import { genComponentStyleHook, mergeToken, resetComponent } from '../../_util/theme';

export interface ComponentToken {}

interface SegmentedToken extends FullToken<'Segmented'> {
  segmentedBg: string;
  segmentedHoverBg: string;
  segmentedSelectedBg: string;
  segmentedLabelColor: string;
  segmentedLabelHoverColor: string;
  segmentedPaddingHorizontal: number;
  segmentedPaddingHorizontalSM: number;
  segmentedContainerPadding: number;
  segmentedSelectedItemBoxShadow: string;
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
    backgroundColor: token.segmentedSelectedBg,
    borderRadius: token.controlRadius,
    boxShadow: token.segmentedSelectedItemBoxShadow,
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
          backgroundColor: token.segmentedHoverBg,
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
          color: token.segmentedLabelHoverColor,
        },

        '&:hover, &:focus': {
          color: token.segmentedLabelHoverColor,
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
export default genComponentStyleHook('Segmented', token => {
  const {
    colorBgComponentSecondary,
    colorBgComponent,
    colorTextSecondary,
    colorText,
    lineWidthBold,
    controlLineWidth,
  } = token;

  const segmentedSelectedItemBoxShadow = [
    `0 2px 8px -2px ${new TinyColor('#000').setAlpha(0.05).toRgbString()}`,
    `0 1px 4px -1px ${new TinyColor('#000').setAlpha(0.07).toRgbString()}`,
    `0 0 1px 0 ${new TinyColor('#000').setAlpha(0.08).toRgbString()}`,
  ].join(',');

  const segmentedToken = mergeToken<SegmentedToken>(token, {
    segmentedSelectedItemBoxShadow,

    segmentedBg: colorBgComponentSecondary,
    segmentedHoverBg: new TinyColor(colorBgComponentSecondary).darken(2).toRgbString(),
    segmentedSelectedBg: colorBgComponent,
    segmentedLabelColor: colorTextSecondary,
    segmentedLabelHoverColor: colorText,
    segmentedPaddingHorizontal: token.controlPaddingHorizontal - controlLineWidth,
    segmentedPaddingHorizontalSM: token.controlPaddingHorizontalSM - controlLineWidth,
    segmentedContainerPadding: lineWidthBold,
  });
  return [genSegmentedStyle(segmentedToken)];
});
