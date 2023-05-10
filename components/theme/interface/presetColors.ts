export const PresetColors = [
  'blue',
  'purple',
  'cyan',
  'green',
  'magenta',
  'pink',
  'red',
  'orange',
  'yellow',
  'volcano',
  'geekblue',
  'lime',
  'gold',
] as const;

export type PresetColorKey = typeof PresetColors[number];

export type PresetColorType = Record<PresetColorKey, string>;

type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type LegacyColorPalettes = {
  /**
   * @deprecated
   */
  [key in `${keyof PresetColorType}-${ColorPaletteKeyIndex}`]: string;
};

export type ColorPalettes = {
  [key in `${keyof PresetColorType}${ColorPaletteKeyIndex}`]: string;
};
