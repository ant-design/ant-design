import { StyleVariables, Style } from './styleVariables';
import { Theme } from '../components/style/themes/varnish/Theme';
import { getFontImportsURL } from '../components/style/themes/varnish/typography';

/**
 * Returns the styles required for shellac as a string.
 */
// eslint-disable-next-line import/prefer-default-export
export function generateLESS() {
    const vars = StyleVariables.fromTheme(Theme.default, Style.LESS);
    return `
@import (css) "${getFontImportsURL()}";

${vars.toVariables()}

html, body {
    margin: 0;
    padding: 0;
}

* {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}

body {
    color: ${vars.getRefOrError('palette.text.primary')};
    font-size:  ${vars.getRefOrError('typography.body.fontSize')};
    font-family: ${vars.getRefOrError('typography.body.fontFamily')};
    line-height:  ${vars.getRefOrError('typography.body.lineHeight')};
    /**
     * These settings are non-standard, but important to ensure things
     * look as expected.
     */;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    font-smooth: antialiased;
}

h1, h2, h3, h4, h5, h6 {
    margin: ${vars.getRefOrError('spacing.lg')} 0;
    color: ${vars.getRefOrError('palette.text.primary')};
    font-family: ${vars.getRefOrError('typography.h1.fontFamily')};
    font-variant-numeric: lining-nums;
}

h1 {
    font-weight: ${vars.getRefOrError('typography.h1.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h1.fontSize')};
    line-height: ${vars.getRefOrError('typography.h1.lineHeight')};
}

h2 {
    font-weight: ${vars.getRefOrError('typography.h2.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h2.fontSize')};
    line-height: ${vars.getRefOrError('typography.h2.lineHeight')};
}

h3 {
    font-weight: ${vars.getRefOrError('typography.h3.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h3.fontSize')};
    line-height: ${vars.getRefOrError('typography.h3.lineHeight')};
}

h4 {
    font-weight: ${vars.getRefOrError('typography.h4.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h4.fontSize')};
    line-height: ${vars.getRefOrError('typography.h4.lineHeight')};
}

h5 {
    font-weight: ${vars.getRefOrError('typography.h5.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h5.fontSize')};
    line-height: ${vars.getRefOrError('typography.h5.lineHeight')};
    text-transform: uppercase;
}

h6 {
    font-weight: ${vars.getRefOrError('typography.h6.fontWeight')};
    font-size: ${vars.getRefOrError('typography.h6.fontSize')};
    line-height: ${vars.getRefOrError('typography.h6.lineHeight')};
    text-transform: uppercase;
}

p {
    margin-bottom: ${vars.getRefOrError('spacing.lg')};
}

a[href] {
    color: ${vars.getRefOrError('link.color')};
    text-decoration: ${vars.getRefOrError('link.decoration')};
    cursor: pointer;
}

a[href]:hover {
    color: ${vars.getRefOrError('link.hover.color')};
    text-decoration: ${vars.getRefOrError('link.hover.decoration')};
}

a[href]:active {
    color: ${vars.getRefOrError('link.activeColor')};
}

ul {
    margin: 0;
    padding: 0 0 0 ${vars.getRefOrError('spacing.md')};
    list-style-type: none;
}

ol {
    margin: 0;
    padding: 0 0 0 ${vars.getRefOrError('spacing.lg')};
}

li {
    padding: 0;
}

li:last-child {
    margin-bottom: 0;
}

blockquote {
    margin: ${vars.getRefOrError('spacing.lg')} ${vars.getRefOrError('spacing.xs')};
    padding: ${vars.getRefOrError('spacing.md')} ${vars.getRefOrError('spacing.xs')};
    border-left: ${vars.getRefOrError('spacing.xxs')} solid ${vars.getRefOrError('color.N5')};
}

/**
 * You can't use css variables in media queries, so we just source this
 * directly from the original theme definition.
 */
@media screen and (max-width: ${vars.getRefOrError('breakpoints.lg')}) {
    html {
        font-size: ${100 * (14 / 16)}%;
    }
}
    `.trim();
}
