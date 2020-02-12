import { StyleVariables, Style } from './styleVariables';
import { Theme } from '../components/style/themes/varnish/Theme';
import { getFontImportsURL } from '../components/style/themes/varnish/typography';

/**
 * Returns the styles required for shellac as a string.
 */
// eslint-disable-next-line import/prefer-default-export
export function generateCSS() {
    const vars = StyleVariables.fromTheme(Theme.default, Style.CSS);
    return `
@import "${getFontImportsURL()}";

:root {
    ${vars.toVariables('    ')}
}

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
    font-family: ${vars.getRefOrError('typography.body.fontFamily')};
    font-size:  ${vars.getRefOrError('typography.body.fontSize')};
    color: ${vars.getRefOrError('palette.text.primary')};
    line-height:  ${vars.getRefOrError('typography.body.lineHeight')};
    /**
     * These settings are non-standard, but important to ensure things
     * look as expected.
     */;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
    font-smoothing: antialiased;
}

main,
.content {
    max-width: ${vars.getRefOrError('breakpoints.lg')};
    padding: ${vars.getRefOrError('spacing.xl')};
    margin: 0 auto;
}

main > *:first-child {
    margin-top: 0;
}

main > *:last-child {
    margin-bottom: 0;
}

.banner {
    background: ${vars.getRefOrError('palette.background.dark')};
    color: ${vars.getRefOrError('palette.text.contrast')};
    line-height: 1;
}

.banner .content {
    padding-top: ${vars.getRefOrError('spacing.xxs')};
    padding-bottom: ${vars.getRefOrError('spacing.xxs')};
}

.banner .content a {
    display: block;
    padding: 5px 0 2px 0;
}

h1, h2, h3, h4, h5, h6 {
    font-family: ${vars.getRefOrError('typography.h1.fontFamily')};
    color: ${vars.getRefOrError('palette.text.primary')};
    font-variant-numeric: lining-nums;
    margin: ${vars.getRefOrError('spacing.lg')} 0;
}

h1 {
    font-size: ${vars.getRefOrError('typography.h1.fontSize')};
    line-height: ${vars.getRefOrError('typography.h1.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h1.fontWeight')};
}

h2 {
    font-size: ${vars.getRefOrError('typography.h2.fontSize')};
    line-height: ${vars.getRefOrError('typography.h2.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h2.fontWeight')};
}

h3 {
    font-size: ${vars.getRefOrError('typography.h3.fontSize')};
    line-height: ${vars.getRefOrError('typography.h3.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h3.fontWeight')};
}

h4 {
    font-size: ${vars.getRefOrError('typography.h4.fontSize')};
    line-height: ${vars.getRefOrError('typography.h4.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h4.fontWeight')};
}

h5 {
    font-size: ${vars.getRefOrError('typography.h5.fontSize')};
    line-height: ${vars.getRefOrError('typography.h5.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h5.fontWeight')};
    text-transform: uppercase;
}

legend,
h6 {
    font-size: ${vars.getRefOrError('typography.h6.fontSize')};
    line-height: ${vars.getRefOrError('typography.h6.lineHeight')};
    font-weight: ${vars.getRefOrError('typography.h6.fontWeight')};
    text-transform: uppercase;
}

p {
    margin: ${vars.getRefOrError('spacing.lg')} 0;
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

form {
    max-width: 68ch;
}

input[type="submit"],
button {
    background: ${vars.getRefOrError('button.primary.background')};
    cursor: pointer;
    color: ${vars.getRefOrError('button.primary.color')};
    padding: ${vars.getRefOrError('spacing.sm')} ${vars.getRefOrError('spacing.md')};
    border-radius: ${vars.getRefOrError('shape.borderRadius')};
    /**
     * Varnish buttons have some pretty tricky mechanics around border and
     * padding. We simplify those greatly and just omit the border.
     */
    border: none;
    font-weight: ${vars.getRefOrError('button.default.fontWeight')};
    font-size: ${vars.getRefOrError('typography.bodySmall.fontSize')};

    /**
     * The styles below are to reset those applied to buttons by the
     * default user-agent stylesheet. We may want to consider normalize
     * or something like that in the future.
     */
    font-family: inherit;
}

input[type="submit"]:hover,
button:hover {
    background: ${vars.getRefOrError('button.primary.hover.background')};
}

input[type="submit"]:disabled,
button:disabled {
    opacity: ${vars.getRefOrError('button.primary.disabled.opacity')};
    background: ${vars.getRefOrError('button.primary.disabled.background')};
    cursor: default;
}

fieldset {
    padding: ${vars.getRefOrError('spacing.md')};
    border: 1px solid ${vars.getRefOrError('color.N5')};
    border-radius: ${vars.getRefOrError('shape.borderRadius')};
}

legend {
    padding: 0 ${vars.getRefOrError('spacing.sm')};
}

fieldset > *:nth-child(2) {
    margin-top: 0;
}

fieldset > *:last-child {
    margin-bottom: 0;
}

fieldset,
.form-row {
    margin: ${vars.getRefOrError('spacing.md')} 0;
}

.checklist,
.radiolist {
    list-style-type: none;
    margin: ${vars.getRefOrError('spacing.md')} 0;
    padding: 0 ${vars.getRefOrError('spacing.md')};
    display: grid;
    grid-gap: ${vars.getRefOrError('spacing.xxs')};
}

.checklist li,
.radiolist li {
    display: grid;
    grid-template-columns: min-content auto;
    grid-gap: ${vars.getRefOrError('spacing.xxs')};
    align-items: center;
}

input[type="text"],
input[type="search"],
textarea {
    display: block;
    margin: ${vars.getRefOrError('spacing.xxs')} 0;
    padding: ${vars.getRefOrError('spacing.xs')} ${vars.getRefOrError('spacing.sm')};
    border-radius: ${vars.getRefOrError('shape.borderRadius')};
    border: 1px solid ${vars.getRefOrError('color.N5')};
    width: 100%;
}

input,
textarea,
select {
    font-family: inherit;
}

input,
textarea {
    font-size: ${vars.getRefOrError('typography.bodySmall.fontSize')};
}

select {
    /* Inherit the default font-size from it's parent. */
    font-size: 1em;
}

footer {
    background: ${vars.getRefOrError('palette.background.light')};
}

footer .content {
    padding-top: ${vars.getRefOrError('spacing.md')};
    padding-bottom: ${vars.getRefOrError('spacing.md')};
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
