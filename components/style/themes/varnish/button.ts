import { spacing, Spacing } from './spacing';
import { color, Color } from './colors';
import { fontWeight } from './fontWeight';
import { palette } from './palette';

export interface ButtonStyle {
  paddingVertical?: string;
  paddingHorizontal?: string;
  height?: string;
  fontWeight?: number;
  color?: Color;
  contrastColor?: Color;
  border?: string;
  contrastBorder?: string;
  background?: Color;
  textTransform?: string;
  focus: any; // force required so we dont have to check for undefined later
  hover: any; // force required so we dont have to check for undefined later
  disabled: any; // force required so we dont have to check for undefined later
}

export interface Button {
  primary: ButtonStyle;
  default: ButtonStyle;
  link: ButtonStyle;
  marketing: ButtonStyle;
}
export const defaultSpacing = [spacing.xs, spacing.md];
const marketingSpacing = [spacing.sm, spacing.lg];
const paddingWithBorderInside = (borderWidth: number, initialPadding: Spacing) => {
  // initial pad minus the border width + a single pixel for the standard border width expected by other components
  return `${initialPadding.getValue() - borderWidth + 1}px`;
};
export const borderColor = palette.border.dark;
const marketingColor = palette.secondary.main;
const whiteColor = palette.text.contrast;
const blackColor = palette.text.primary;

export const button = {
  default: {
    background: color.transparent,
    border: `1px solid ${borderColor}`,
    color: blackColor,
    contrastColor: whiteColor,
    fontWeight: fontWeight.bold,
    paddingVertical: paddingWithBorderInside(1, defaultSpacing[0]),
    paddingHorizontal: paddingWithBorderInside(1, defaultSpacing[1]),
    textTransform: 'auto',
    hover: {
      background: color.transparent,
      border: `2px solid ${borderColor}`,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    },
    focus: {
      background: color.transparent,
      border: `3px solid ${borderColor}`,
      paddingVertical: paddingWithBorderInside(3, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(3, defaultSpacing[1]),
    },
    disabled: {
      background: color.transparent,
      border: `1px solid ${borderColor}`,
      color: blackColor,
      contrastColor: whiteColor,
      opacity: 0.5,
      paddingVertical: paddingWithBorderInside(1, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(1, defaultSpacing[1]),
    },
  },
  primary: {
    background: palette.primary.main,
    border: `2px solid transparent`,
    color: whiteColor,
    paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
    paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    hover: {
      border: `2px solid transparent`,
      background: palette.primary.dark,
    },
    focus: {
      border: `2px solid ${palette.primary.veryDark}`,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
      color: whiteColor,
    },
    disabled: {
      opacity: 0.5,
      background: palette.primary.veryDark,
      border: `2px solid transparent`,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
      color: whiteColor,
    },
  },
  link: {
    background: color.transparent,
    border: `2px solid transparent`,
    color: palette.primary.dark,
    contrastColor: whiteColor,
    paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
    paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    hover: {
      background: color.B2,
      contrastBackground: palette.primary.dark,
      border: `2px solid transparent`,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    },
    focus: {
      border: `2px solid ${palette.primary.light}`,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    },
    disabled: {
      border: `2px solid transparent`,
      color: palette.primary.light,
      contrastColor: whiteColor,
      opacity: 0.5,
      paddingVertical: paddingWithBorderInside(2, defaultSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, defaultSpacing[1]),
    },
  },
  marketing: {
    border: `2px solid ${marketingColor}`,
    contrastBorder: `2px solid ${whiteColor}`,
    color: marketingColor,
    contrastColor: whiteColor,
    fontWeight: fontWeight.bold,
    paddingVertical: paddingWithBorderInside(2, marketingSpacing[0]),
    paddingHorizontal: paddingWithBorderInside(2, marketingSpacing[1]),
    textTransform: 'uppercase',
    hover: {
      background: marketingColor,
      contrastBackground: whiteColor,
      border: `2px solid ${marketingColor}`,
      contrastBorder: `2px solid ${whiteColor}`,
      color: whiteColor,
      contrastColor: color.B6,
      paddingVertical: paddingWithBorderInside(2, marketingSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, marketingSpacing[1]),
    },
    focus: {
      background: color.transparent,
      border: `2px solid ${palette.secondary.dark}`,
      contrastBorder: `2px solid ${color.B3}`,
      paddingVertical: paddingWithBorderInside(2, marketingSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, marketingSpacing[1]),
    },
    disabled: {
      background: color.transparent,
      border: `2px solid ${marketingColor}`,
      contrastBorder: `2px solid ${whiteColor}`,
      color: marketingColor,
      contrastColor: whiteColor,
      opacity: 0.5,
      paddingVertical: paddingWithBorderInside(2, marketingSpacing[0]),
      paddingHorizontal: paddingWithBorderInside(2, marketingSpacing[1]),
    },
  },
};

/**
 * This is the best we can do without typeguards (which drop in TS 3.7)
 * to verify that the `button` implements the `Button` interface.
 *
 * TODO: Use TypeGuards instead.
 */
// eslint-disable-next-line no-unused-vars
function isButtonStyle(_: Button): void {}
isButtonStyle(button);
