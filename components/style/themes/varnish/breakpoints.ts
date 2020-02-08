import { Breakpoint } from './spacing';

export const breakpoints = {
    xs: Breakpoint.fromPixels(480),
    sm: Breakpoint.fromPixels(576),
    md: Breakpoint.fromPixels(768),
    lg: Breakpoint.fromPixels(992),
    xl: Breakpoint.fromPixels(1200),
    xl2: Breakpoint.fromPixels(1600),
};

/* Usage:
    @media ${({ theme }) => above(theme.breakpoints.lg)} {
      // styles for (min-width: 993px)
    }
*/
export function above(breakpoint: Breakpoint) {
    return `(min-width: ${breakpoint.getValue() + 1}px)`;
}

/* Usage:
    @media ${({ theme }) => belowOrEqualTo(theme.breakpoints.lg)} {
      // styles for (max-width: 992px)
    }
*/
export function belowOrEqualTo(breakpoint: Breakpoint) {
    return `(max-width: ${breakpoint.getValue()}px)`;
}
