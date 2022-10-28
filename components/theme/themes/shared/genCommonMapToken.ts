import type { CommonMapToken, SeedToken } from '../../interface';
import genFontSizes from './genFontSizes';
import genRadius from './genRadius';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const { motionUnit, motionBase, fontSizeBase, radiusBase, controlHeight, lineWidth } = token;

  const fontSizes = genFontSizes(fontSizeBase);

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // font
    fontSizes: fontSizes.map(fs => fs.size),
    lineHeights: fontSizes.map(fs => fs.lineHeight),

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    ...genRadius(radiusBase),

    // control
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,
  };
}
