import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { genNoMotionStyle } from '../../style/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export interface ComponentToken {
  /**
   * @desc 流光边框环宽度
   * @descEN Beam ring width
   */
  borderBeamWidth: number;
}

interface BorderBeamToken extends FullToken<'BorderBeam'> {}

const genBorderBeamStyle: GenerateStyle<BorderBeamToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const [, varRef] = genCssVar(antCls, 'border-beam');

  // =========================== Animation ============================
  const antBorderBeamMove = new Keyframes('antBorderBeamMove', {
    from: {
      offsetDistance: '0%',
    },
    to: {
      offsetDistance: '100%',
    },
  });

  // ============================= Style ==============================
  return {
    [componentCls]: {
      // Container
      display: 'none',
      position: 'absolute',
      inset: [
        varRef('border-top-width', '0px'),
        varRef('border-right-width', '0px'),
        varRef('border-bottom-width', '0px'),
        varRef('border-left-width', '0px'),
      ].join(' '),
      borderTopLeftRadius: varRef('border-top-left-radius', '0px'),
      borderTopRightRadius: varRef('border-top-right-radius', '0px'),
      borderBottomRightRadius: varRef('border-bottom-right-radius', '0px'),
      borderBottomLeftRadius: varRef('border-bottom-left-radius', '0px'),
      zIndex: 1,
      overflow: 'hidden',
      boxSizing: 'border-box',
      pointerEvents: 'none',

      // Border Beam
      padding: token.borderBeamWidth,

      // Border Beam Effect
      '@supports ((mask-composite: exclude) or (-webkit-mask-composite: xor))': {
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',

        '@supports (offset-path: rect(0 auto auto 0 round 1px))': {
          display: 'block',

          '&::before': {
            ...genNoMotionStyle(),
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: 100,
            aspectRatio: '1 / 1',
            opacity: 0.95,
            backgroundImage: 'linear-gradient(to left, #1677ff, #4096ff, transparent)',
            offsetAnchor: '90% 50%',
            offsetDistance: '0%',
            offsetPath: 'rect(0 auto auto 0 round 200px)',
            offsetRotate: 'auto',
            animationName: antBorderBeamMove,
            animationDuration: '6s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            willChange: 'offset-distance',
          },
        },
      },

      '@media (prefers-reduced-motion: reduce)': {
        '&::before': {
          display: 'none',
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'BorderBeam'> = (token) => ({
  borderBeamWidth: token.lineWidth,
});

export default genStyleHooks('BorderBeam', genBorderBeamStyle, prepareComponentToken, {
  resetStyle: false,
});
