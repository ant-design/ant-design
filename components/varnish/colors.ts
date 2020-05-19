export class RGB {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(public r: number, public g: number, public b: number) {}

  toString() {
    return `rgb(${this.r},${this.g},${this.b})`;
  }
}

// convert a hex color string to a RGB
export function hexToRgb(hex: string): RGB {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([\da-f])([\da-f])([\da-f])$/i;
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    // eslint-disable no-unused-vars
    return r + r + g + g + b + b;
  });
  const result = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(hex);
  return result
    ? new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16))
    : new RGB(0, 0, 0);
}

export class Color {
  public rgb: RGB;

  constructor(public displayName: string, public hex: string, public useContrastText?: boolean) {
    this.hex = hex.toUpperCase();
    this.rgb = hexToRgb(hex);
  }

  toString() {
    return this.hex;
  }
}

export const color = {
  R1: new Color('R1', '#FFF2F2'),
  R2: new Color('R2', '#FFE1E0'),
  R3: new Color('R3', '#FDC1C0'),
  R4: new Color('R4', '#FF9F9E'),
  R5: new Color('R5', '#F9807F'),
  R6: new Color('R6 (Base)', '#F7605F', true),
  R7: new Color('R7', '#E7504F', true),
  R8: new Color('R8', '#D63F3F', true),
  R9: new Color('R9', '#BF2D2D', true),
  R10: new Color('R10', '#932222', true),
  O1: new Color('O1', '#FFF9E8'),
  O2: new Color('O2', '#FFF1C4'),
  O3: new Color('O3', '#FFE394'),
  O4: new Color('O4', '#FFD45D'),
  O5: new Color('O5', '#FFC72E'),
  O6: new Color('O6 (Base)', '#FFBB00', true),
  O7: new Color('O7', '#FFA200', true),
  O8: new Color('O8', '#FF9100', true),
  O9: new Color('O9', '#DD6502', true),
  O10: new Color('O10', '#A94006', true),
  G1: new Color('G1', '#E4FFF7'),
  G2: new Color('G2', '#C1F7E6'),
  G3: new Color('G3', '#98EAD0'),
  G4: new Color('G4', '#70DDBA'),
  G5: new Color('G5', '#47CFA4'),
  G6: new Color('G6 (Base)', '#1EC28E', true),
  G7: new Color('G7', '#14A87D', true),
  G8: new Color('G8', '#0A8F6B', true),
  G9: new Color('G9', '#00755A', true),
  G10: new Color('G10', '#005340', true),
  T1: new Color('T1', '#E6FDFE'),
  T2: new Color('T2', '#C6F3F6'),
  T3: new Color('T3', '#9AE7EC'),
  T4: new Color('T4', '#6EDCE3'),
  T5: new Color('T5', '#42D0D9'),
  T6: new Color('T6 (Base)', '#16C4CF', true),
  T7: new Color('T7', '#0FA9B6', true),
  T8: new Color('T8', '#078E9E', true),
  T9: new Color('T9', '#007385', true),
  T10: new Color('T10', '#004752', true),
  A1: new Color('A1', '#F2FCFF'),
  A2: new Color('A2', '#E0F9FF'),
  A3: new Color('A3', '#B5F0FF'),
  A4: new Color('A4', '#85E9FF'),
  A5: new Color('A5', '#4DE1FF'),
  A6: new Color('A6 (Base)', '#00D5FF', true),
  A7: new Color('A7', '#00C1E8', true),
  A8: new Color('A8', '#01A2CA', true),
  A9: new Color('A9', '#0278A7', true),
  A10: new Color('A10', '#054976', true),
  B1: new Color('B1', '#F0F7FF'),
  B2: new Color('B2', '#D5EAFE'),
  B3: new Color('B3', '#80BDFF'),
  B4: new Color('B4', '#2F85F7'),
  B5: new Color('B5', '#2376E5'),
  B6: new Color('B6 (Base)', '#265ED4', true),
  B7: new Color('B7', '#1A4CAE', true),
  B8: new Color('B8', '#1B4596', true),
  B9: new Color('B9', '#1D3D7E', true),
  B10: new Color('B10', '#223367', true),
  P1: new Color('P1', '#F8F7FD'),
  P2: new Color('P2', '#E6E3F7'),
  P3: new Color('P3', '#CFC9F1'),
  P4: new Color('P4', '#B7AFEB'),
  P5: new Color('P5', '#A094E4'),
  P6: new Color('P6 (Base)', '#887ADE', true),
  P7: new Color('P7', '#7265C1', true),
  P8: new Color('P8', '#5C50A4', true),
  P9: new Color('P9', '#463B87', true),
  P10: new Color('P10', '#271F55', true),
  M1: new Color('M1', '#FDF7FC'),
  M2: new Color('M2', '#F6DFF3'),
  M3: new Color('M3', '#EFC0E8'),
  M4: new Color('M4', '#E7A2DE'),
  M5: new Color('M5', '#E083D3'),
  M6: new Color('M6 (Base)', '#D864C9', true),
  M7: new Color('M7', '#BE54B0', true),
  M8: new Color('M8', '#802579', true),
  M9: new Color('M9', '#8A337E', true),
  M10: new Color('M10', '#65295D', true),
  N1: new Color('N1', '#FFFFFF'),
  N2: new Color('N2', '#F8F9FA'),
  N3: new Color('N3', '#F0F4F7'),
  N4: new Color('N4', '#E8ECF2'),
  N5: new Color('N5', '#D5DAE3'),
  N6: new Color('N6 (Base)', '#AEB7C4', true),
  N7: new Color('N7', '#8C96A3', true),
  N8: new Color('N8', '#616C7A', true),
  N9: new Color('N9', '#47515C', true),
  N10: new Color('N10', '#303945', true),
  black: new Color('Black', '#000', true),
  white: new Color('White', '#FFF'),
  transparent: new Color('Transparent', 'transparent'),
};

// use for charts and viz on top of images
export const chartingColor = {
  DarkBlue: new Color('DarkBlue', '#2389ff', true),
  Green: new Color('Green', '#2ff53a'),
  Magenta: new Color('Magenta', '#cf03e2', true),
  Orange: new Color('Orange', '#ff6c01', true),
  LightBlue: new Color('LightBlue', '#47daff'),
  Red: new Color('Red', '#f22b2b', true),
  Purple: new Color('Purple', '#7948ff', true),
  Yellow: new Color('Yellow', '#fffc00'),
  RoyalBlue: new Color('RoyalBlue', '#235dff', true),
  Teal: new Color('Teal', '#2fffa8'),
  Pink: new Color('Pink', '#e73fa0', true),
  Tangerine: new Color('Tangerine', '#ffad06'),
};
