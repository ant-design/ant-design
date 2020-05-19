import { color } from './colors';

const defaultColor = color.B6;
const contrastColor = color.B4;

// eslint-disable-next-line import/prefer-default-export
export const link = {
  color: defaultColor,
  activeColor: defaultColor,
  decoration: 'none',
  contrastColor,
  contrastActiveColor: contrastColor,
  hover: {
    color: defaultColor,
    decoration: 'underline',
    contrastColor,
  },
};
