// =============================== Derivative ===============================
import { generate } from '@ant-design/colors';
import { TinyColor } from '@ctrl/tinycolor';
import { ColorPalettes, PresetColorKeys, PresetColorType } from '..';
import { SeedToken } from './seed';

export interface DerivativeToken extends ColorPalettes {
  // =================== Derivative Parts ===================
  // Derivative Parts: is generated directly by the algorithm with DesignToken.
  colorPrimaryHover: string;
  colorPrimaryActive: string;
  colorErrorHover: string;
  colorErrorActive: string;

  // 字体
  fontSizeSM: number;
  fontSizeLG: number;
  fontSize: number;
  fontSizeXL: number;

  // 尺寸

  sizeSpace: number;
  sizeSpaceXS: number;
  sizeSpaceXXS: number;
  sizeSpaceSM: number;

  gridSpaceSM: number;
  gridSpaceBase: number;
  gridSpaceLG: number;
  gridSpaceXL: number;
  gridSpaceXXL: number;

  colorText2: string;
  colorTextBelow: string;
  colorTextBelow2: string;
  colorTextBelow3: string;

  colorBgBelow: string;
  colorBgBelow2: string;

  // motion

  motionDurationBase: string;
  motionDurationMd: string;
  motionDurationFast: string;
  motionDurationSlow: string;
  fontHeight: number;

  radiusSM: number;
  radiusLG: number;
  radiusXL: number;
}

function derivative(token: SeedToken): DerivativeToken {
  const {
    colorPrimary,
    colorError,
    motionUnit,
    motionBaseStep,
    fontSizeBase,
    sizeUnit,
    sizeBaseStep,
    gridUnit,
    gridBaseStep,
    radiusBase,
  } = token;

  const primaryColors = generate(colorPrimary);
  const errorColors = generate(colorError);

  const colorPalettes = PresetColorKeys.map((colorKey: keyof PresetColorType) => {
    const colors = generate(token[colorKey]);

    return new Array(10).fill(1).reduce((prev, _, i) => {
      prev[`${colorKey}-${i + 1}`] = colors[i];
      return prev;
    }, {}) as ColorPalettes;
  }).reduce((prev, cur) => {
    prev = {
      ...prev,
      ...cur,
    };
    return prev;
  }, {} as ColorPalettes);

  return {
    ...token,
    ...colorPalettes,

    // motion
    motionDurationBase: `${motionUnit * motionBaseStep}s`,
    motionDurationMd: `${motionUnit * (motionBaseStep - 1)}s`,
    motionDurationFast: `${motionUnit * (motionBaseStep - 2)}s`,
    motionDurationSlow: `${motionUnit * (motionBaseStep + 1)}s`,

    // font
    fontSize: fontSizeBase,
    fontSizeSM: fontSizeBase - 2,
    fontSizeLG: fontSizeBase + 2,
    fontSizeXL: fontSizeBase + 4,

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

    // radius
    radiusSM: radiusBase / 2,
    radiusLG: radiusBase * 2,
    radiusXL: radiusBase * 4,

    // color //

    colorBgBelow: new TinyColor({ h: 0, s: 0, v: 98 }).toHexString(),
    colorBgBelow2: new TinyColor({ h: 0, s: 0, v: 96 }).toHexString(),

    colorErrorActive: errorColors[6],
    colorErrorHover: errorColors[4],
    colorPrimaryActive: primaryColors[6],

    colorPrimaryHover: primaryColors[4],

    // text color
    colorText2: new TinyColor('#000').setAlpha(0.85).toRgbString(),

    colorTextBelow: new TinyColor('#000').setAlpha(0.45).toRgbString(),
    colorTextBelow2: new TinyColor('#000').setAlpha(0.25).toRgbString(),
    colorTextBelow3: new TinyColor({ h: 0, s: 0, v: 75 }).setAlpha(0.5).toRgbString(),

    // FIXME: should be currentFontSize + 8
    fontHeight: fontSizeBase + 8,
  };
}

export default derivative;
