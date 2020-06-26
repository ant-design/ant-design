import { color, Color } from './colors';

// eslint-disable-next-line import/prefer-default-export
export const palette: { [k: string]: { [k: string]: Color } } = {
  common: {
    black: color.black,
    white: color.white,
    transparent: color.transparent,
  },
  background: {
    light: color.N2,
    dark: color.B10,
    error: color.R1,
    info: color.B1,
    success: color.G1,
    warning: color.O1,
  },
  border: {
    light: color.N2,
    dark: color.N7,
    default: color.N4,
    error: color.R4,
    info: color.B4,
    success: color.G4,
    warning: color.O4,
  },
  primary: {
    light: color.B5,
    default: color.B6,
    dark: color.B7,
    veryDark: color.B8,
  },
  secondary: {
    light: color.O5,
    default: color.O6,
    dark: color.O7,
  },
  text: {
    heading: color.N10,
    primary: color.N9,
    secondary: color.N7,
    error: color.R6,
    info: color.B6,
    success: color.G6,
    warning: color.O6,
    contrast: color.N1,
  },
};
