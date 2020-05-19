import { StyleVariables, Style } from './styleVariables';
import { Theme } from '../components/varnish/Theme';

/**
 * The `less-loader` that's included with antd's build tools has a bug that causes @imports
 * with absolute URLs to fail. This means we can't use @import with the Google Font URLs that
 * Varnish depends on. To work around this we hardcoded the font-face declarations.
 * Here's the fix:
 * https://github.com/webpack-contrib/less-loader/commit/a3f9601c9439471f7f0ce9b4a59ba4cf9e178c43
 */
const fonts = `
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhGq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhPq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhHq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhIq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhEq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhFq3-cXbKDO1w.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v7/L0x5DF4xlVMF-BfR8bXMIjhLq3-cXbKD.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* cyrillic-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmq8f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmq1f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* greek-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmq9f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+1F00-1FFF;
}
/* greek */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmqyf7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0370-03FF;
}
/* vietnamese */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmq-f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
}
/* latin-ext */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmq_f7-pAVU_Lrg.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'), url(https://fonts.gstatic.com/s/robotomono/v7/L0xkDF4xlVMF-BfR8bXMIjDwjmqxf7-pAVU_.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin */
@font-face {
  font-family: 'Volkhov';
  font-style: normal;
  font-weight: 400;
  src: local('Volkhov Regular'), local('Volkhov-Regular'), url(https://fonts.gstatic.com/s/volkhov/v11/SlGQmQieoJcKemNecTUEhV5wYDw.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin */
@font-face {
  font-family: 'Volkhov';
  font-style: normal;
  font-weight: 700;
  src: local('Volkhov Bold'), local('Volkhov-Bold'), url(https://fonts.gstatic.com/s/volkhov/v11/SlGVmQieoJcKemNeeY4hkHNSbRYXags.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
`;

/**
 * Returns the styles required for shellac as a string.
 */
// eslint-disable-next-line import/prefer-default-export
export function generateLESS() {
  const vars = StyleVariables.fromTheme(Theme.default, Style.LESS);
  return `
${fonts}

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
    `.trim();
}
