import { VarnishTheme, Color } from '../components/style/themes/varnish/Theme';
import { Spacing, Breakpoint } from '../components/style/themes/varnish/spacing';

/**
 * This is a helper function that flattens all theme variables into an array of
 * tuples, where the first half is the symbolic name and the second half is
 * the value.
 *
 * For a better explanation of what a symbolic name is see the documentation
 * for the StyleVariables class below.
 */
function getThemeVariables(props: { [k: string]: any }, prefix = ''): [string, string][] {
    return Object.getOwnPropertyNames(props).reduce((allProps, propName) => {
        const value = props[propName];
        const name = (prefix !== '' ? `${prefix}.` : '') + propName;

        if (Array.isArray(value)) {
            throw new Error(`Invalid type, ${propName} is an Array`);
        }

        if (value instanceof Breakpoint || value instanceof Spacing || value instanceof Color) {
            return allProps.concat([[name, value.toString()]]);
        }

        if (typeof value === 'object') {
            const children = getThemeVariables(value, name);
            return allProps.concat(children);
        }

        return allProps.concat([[name, value]]);
    }, [] as [string, string][]);
}

const reDigit = /\d+/;
function isUpperCaseLetter(char?: string): boolean {
    if (!char) {
        return false;
    }
    return !reDigit.test(char) && char.toUpperCase() === char;
}

/**
 * Shellac supports exporting CSS and LESS
 */
export enum Style {
    CSS = 0,
    LESS
};

/**
 * Helper function that returns a variable name that's formatted appropriately
 * for use as a CSS of LESS variable from a symbolic name.
 *
 * For instance, `spacing.lg` will become `--spacing-lg` for CSS and `shape.borderRadius`
 * will become `@shape-border-radius` for LESS.
 */
function toStyleVarName(name: string, style: Style = Style.CSS) {
    const prefix = style === Style.CSS ? '--' : '@v-';
    let lastChar;
    let formattedName = '';
    const chars = Array.from(name);
    for (let i = 0; i < name.length; i++) {
        const char = chars[i];
        if (char === '.') {
            lastChar = '-';
            formattedName += lastChar;
        } else if (isUpperCaseLetter(char)) {
            if (lastChar === '-' || isUpperCaseLetter(lastChar)) {
                lastChar = char.toLowerCase();
                formattedName += lastChar;
            } else {
                lastChar = char.toLowerCase();
                formattedName += `-${lastChar}`;
            }
        } else {
            lastChar = char;
            formattedName += char;
        }
    }

    return `${prefix}${formattedName}`;
}

/**
 * The StyleVariables class is used to dynamically map the Varnish theme
 * to CSS or LESS variables, so that they can be used both in shellac's css
 * and by people extending shellac for their particular use case.
 *
 * MDN has great documentation on CSS variables:
 * https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 *
 * We also map the symbolic name of each theme property in Varnish to
 * the css variable name, the intent being to allow us to embed css variable
 * references without hard-coding the dynamically generated values.
 *
 * The symbolic name of a theme value is a string representation of the
 * object notation used to refer to a theme property when writing a
 * `styled-component`. For instance, in the example below, `spacing.lg` is
 * what we're referring to as the symbolic name:
 *
 *      const StyledList = styled.ul`
 *          padding: ${({ theme }) => theme.spacing.lg};
 *      `
 *
 * Another motivation of this approach is to help catch errors.  The
 * `getRefOrError` method below provides a way to refer to a property by
 * its symbolic name, and throw an exception if no such mapping exists. This
 * way things will break loudly when changes to the theme aren't propagated
 * to shellac. Otherwise it'd be very easy to publish css that's simply missing
 * values.
 */
export class StyleVariables {
    private valuesByName: { [k: string]: string };

    constructor(vars: [string, string][], private style: Style = Style.CSS) {
        this.valuesByName = vars.reduce((byName, [name, value]) => {
            if (name in byName) {
                throw new Error(`Duplicate id: ${name}`);
            }
            byName[name] = value;
            return byName;
        }, {} as { [k: string]: string });
    }

    getRefOrError(name: string): string {
        if (!(name in this.valuesByName)) {
            throw new Error(`Invalid variable: ${name}`);
        }
        let ret = toStyleVarName(name, this.style);
        if(this.style === Style.CSS) {
            ret = `var(${ret})`
        }
        return ret;
    }

    toVariables(indent: string = ''): string {
        return Object.entries(this.valuesByName)
            .map(([name, value]) => `${toStyleVarName(name, this.style)}: ${value};`)
            .join(`\n${indent}`);
    }

    static fromTheme(theme: VarnishTheme, style: Style = Style.CSS): StyleVariables {
        return new StyleVariables(getThemeVariables(theme), style);
    }
}
