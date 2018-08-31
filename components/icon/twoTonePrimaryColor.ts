import ReactIcon, { TwoToneColorPalette, TwoToneColorPaletteSetter } from '@ant-design/icons-react';

export function setTwoToneColors(colors: TwoToneColorPaletteSetter): void {
  return ReactIcon.setTwoToneColors(colors);
}

export function getTwoToneColors(): TwoToneColorPalette {
  return ReactIcon.getTwoToneColors();
}
