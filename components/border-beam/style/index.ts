import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { genNoMotionStyle } from '../../style/motion';
import type { FullToken, GenerateStyle } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';
import { MAX_BEAM_COLOR_STOP_PERCENT } from '../util';

export type ComponentToken = object;

interface BorderBeamToken extends FullToken<'BorderBeam'> {}

const genBorderBeamStyle: GenerateStyle<BorderBeamToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const [, varRef] = genCssVar(antCls, 'border-beam');
  const defaultBeamGradient = `linear-gradient(to left, ${token.colorPrimary} 0%, ${token.colorPrimaryHover} ${MAX_BEAM_COLOR_STOP_PERCENT}%, transparent)`;

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
      inset: varRef('inset-offset', '0px'),
      borderRadius: varRef('border-radius', '0px'),
      zIndex: 1,
      overflow: 'hidden',
      pointerEvents: 'none',

      // Border Beam
      padding: token.lineWidth,

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
            backgroundImage: varRef('beam-gradient', defaultBeamGradient),
            offsetAnchor: '90% 50%',
            offsetDistance: '0%',
            offsetPath: 'rect(0 auto auto 0 round 100px)',
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

export default genStyleHooks('BorderBeam', genBorderBeamStyle);
