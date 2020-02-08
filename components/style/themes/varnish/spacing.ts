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

/**
 * We don't want breakpoints to change based on the user's default font
 * size, so for Breakpoints we specifically stringify them as pixels.
 */
export class Breakpoint extends Spacing {
    static fromPixels(px: number) {
        return new Breakpoint(`${px}px`);
    }
}

export const spacing = {
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
