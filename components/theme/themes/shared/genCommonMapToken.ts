import genFontMapToken from 'antd/es/theme/themes/shared/genFontMapToken';
import type { CommonMapToken, SeedToken } from '../../interface';
import genRadius from './genRadius';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { motionUnit, motionBase, borderRadius, lineWidth, fontSize } = token;

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // font
    ...genFontMapToken(fontSize),

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    ...genRadius(borderRadius),
  };
}
