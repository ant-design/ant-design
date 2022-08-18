import type { CommonMapToken, SeedToken } from '../../interface';
import genFontSizes from './genFontSizes';

export default function genCommonMapToken(token: SeedToken): CommonMapToken {
  const {
    motionUnit,
    motionBase,
    fontSizeBase,
    sizeUnit,
    sizeBaseStep,
    gridUnit,
    gridBaseStep,
    radiusBase,
    controlHeight,
    lineWidth,
  } = token;

  const fontSizes = genFontSizes(fontSizeBase);

  return {
    // motion
    motionDurationFast: `${(motionBase + motionUnit * 1).toFixed(1)}s`,
    motionDurationMid: `${(motionBase + motionUnit * 2).toFixed(1)}s`,
    motionDurationSlow: `${(motionBase + motionUnit * 3).toFixed(1)}s`,

    // font
    fontSizes: fontSizes.map(fs => fs.size),
    lineHeights: fontSizes.map(fs => fs.lineHeight),

    // size
    sizeSpaceSM: sizeUnit * (sizeBaseStep - 1),
    sizeSpace: sizeUnit * sizeBaseStep,
    sizeSpaceXS: sizeUnit * (sizeBaseStep - 2),
    sizeSpaceXXS: sizeUnit * (sizeBaseStep - 3),

    // grid
    gridSpaceSM: gridUnit * (gridBaseStep - 1),
    gridSpaceBase: gridUnit * gridBaseStep,
    gridSpaceLG: gridUnit * (gridBaseStep + 1),
    gridSpaceXL: gridUnit * (gridBaseStep + 2),
    gridSpaceXXL: gridUnit * (gridBaseStep + 5),

    // line
    lineWidthBold: lineWidth + 1,

    // radius
    radiusXS: radiusBase / 3,
    radiusSM: (radiusBase * 2) / 3,
    radiusLG: (radiusBase * 4) / 3,
    radiusOuter: (radiusBase * 4) / 3,

    // control
    controlHeightSM: controlHeight * 0.75,
    controlHeightXS: controlHeight * 0.5,
    controlHeightLG: controlHeight * 1.25,
  };
}
