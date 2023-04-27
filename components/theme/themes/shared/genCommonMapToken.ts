import type { CommonMapToken, SeedToken } from '../../interface';
import genFontSizes from './genFontSizes';
import genRadius from './genRadius';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { motionUnit, motionBase, fontSize, borderRadius, lineWidth } = token;

  const fontSizes = genFontSizes(fontSize);

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // font
    fontSizes: fontSizes.map((fs) => fs.size),
    lineHeights: fontSizes.map((fs) => fs.lineHeight),

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    ...genRadius(borderRadius),
  };
}
