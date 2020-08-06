export class Spacing {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor(public px: string) {}

  static fromPixels(px: number) {
    return new Spacing(`${px}px`);
  }

  toString() {
    return this.px;
  }

  getValue() {
    return parseFloat(this.px);
  }
}

export interface SpacingMap {
  [foo: string]: Spacing;
}

export const spacing: SpacingMap = {
  xxs: Spacing.fromPixels(4),
  xs2: Spacing.fromPixels(4),
  xs: Spacing.fromPixels(8),
  sm: Spacing.fromPixels(12),
  md: Spacing.fromPixels(16),
  lg: Spacing.fromPixels(24),
  xl: Spacing.fromPixels(36),
  xl2: Spacing.fromPixels(48),
  xl3: Spacing.fromPixels(64),
  xl4: Spacing.fromPixels(96),
  xl5: Spacing.fromPixels(128),
};
