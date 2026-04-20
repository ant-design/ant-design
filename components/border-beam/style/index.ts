import type { CSSObject } from '@ant-design/cssinjs';
import { Keyframes } from '@ant-design/cssinjs';

import { genNoMotionStyle } from '../../style/motion';
import type { FullToken, GenerateStyle, GetDefaultToken } from '../../theme/internal';
import { genStyleHooks } from '../../theme/internal';
import { genCssVar } from '../../theme/util/genStyleUtils';

export interface ComponentToken {
  /**
   * @desc 流光起始颜色
   * @descEN Beam start color
   */
  beamColorFrom: string;
  /**
   * @desc 流光结束颜色
   * @descEN Beam end color
   */
  beamColorTo: string;
  /**
   * @desc 流光边框环宽度
   * @descEN Beam ring width
   */
  borderBeamWidth: number;
}

interface BorderBeamToken extends FullToken<'BorderBeam'> {}

const genBorderBeamStyle: GenerateStyle<BorderBeamToken, CSSObject> = (token) => {
  const { componentCls, antCls } = token;
  const [varName, varRef] = genCssVar(antCls, 'border-beam');
  const antBorderBeamMove = new Keyframes('antBorderBeamMove', {
    from: {
      offsetDistance: varRef('beam-offset-start'),
    },
    to: {
      offsetDistance: varRef('beam-offset-end'),
    },
  });

  const beamCls = `${componentCls}-beam`;

  return {
    [componentCls]: {
      [varName('beam-duration')]: '6s',
      [varName('beam-delay')]: '0s',
      [varName('beam-anchor')]: '90%',
      [varName('beam-clip-radius')]: '0px',
      [varName('beam-offset-end')]: '100%',
      [varName('beam-offset-start')]: '0%',
      [varName('beam-path-radius')]: '0px',
      [varName('beam-size')]: '60px',
      [varName('beam-color-from')]: token.beamColorFrom,
      [varName('beam-color-to')]: token.beamColorTo,
      [varName('border-width')]: `${token.borderBeamWidth}px`,

      position: 'relative',
      display: 'block',
      maxWidth: '100%',
      boxSizing: 'border-box',

      [`> ${beamCls}`]: {
        display: 'none',
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        overflow: 'hidden',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        borderRadius: varRef('beam-clip-radius'),
        padding: varRef('border-width'),

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
              width: varRef('beam-size'),
              aspectRatio: '1 / 1',
              opacity: 0.95,
              backgroundImage: `linear-gradient(to left, ${varRef('beam-color-from')}, ${varRef('beam-color-to')}, transparent)`,
              offsetAnchor: `${varRef('beam-anchor')} 50%`,
              offsetDistance: varRef('beam-offset-start'),
              offsetPath: `rect(0 auto auto 0 round ${varRef('beam-path-radius')})`,
              offsetRotate: 'auto',
              animationName: antBorderBeamMove,
              animationDuration: varRef('beam-duration'),
              animationTimingFunction: 'linear',
              animationDelay: varRef('beam-delay'),
              animationIterationCount: 'infinite',
              willChange: 'offset-distance',
            },
          },
        },
      },

      '@media (prefers-reduced-motion: reduce)': {
        [`> ${beamCls}::before`]: {
          display: 'none',
        },
      },
    },
  };
};

export const prepareComponentToken: GetDefaultToken<'BorderBeam'> = (token) => ({
  beamColorFrom: token.colorPrimary,
  beamColorTo: token.colorPrimaryHover,
  borderBeamWidth: token.lineWidth,
});

export default genStyleHooks('BorderBeam', genBorderBeamStyle, prepareComponentToken, {
  resetStyle: false,
});
