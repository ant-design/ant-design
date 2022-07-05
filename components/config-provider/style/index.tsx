import type { CSSObject } from '@ant-design/cssinjs';
import { useStyleRegister } from '@ant-design/cssinjs';
import { TinyColor } from '@ctrl/tinycolor';
import type { AliasToken } from '../../theme';
import { clearFix, useToken } from '../../theme';
import './index.less';

// Reboot
//
// Normalization of HTML elements, manually forked from Normalize.css to remove
// styles targeting irrelevant browsers while applying new styles.
//
// Normalize is licensed MIT. https://github.com/necolas/normalize.css

const genBasicStyle = (token: AliasToken): CSSObject => ({
  // HTML & Body reset
  'html, body': {
    width: '100%',
    height: '100%',
  },

  // remove the clear button of a text input control in IE10+
  [`input::-ms-clear,
    input::-ms-reveal`]: {
    display: 'none',
  },

  // Document
  //
  // 1. Change from `box-sizing: content-box` so that `width` is not affected by `padding` or `border`.
  // 2. Change the default font family in all browsers.
  // 3. Correct the line height in all browsers.
  // 4. Prevent adjustments of font size after orientation changes in IE on Windows Phone and in iOS.
  // 5. Setting @viewport causes scrollbars to overlap content in IE11 and Edge, so
  //    we force a non-overlapping, non-auto-hiding scrollbar to counteract.
  // 6. Change the default tap highlight to be completely transparent in iOS.

  [`*,
    *::before,
    *::after`]: {
    boxSizing: 'border-box', // 1
  },

  html: {
    fontFamily: 'sans-serif', // 2
    lineHeight: 1.15, // 3
    '-webkit-text-size-adjust': '100%', // 4
    '-ms-text-size-adjust': '100%', // 4
    '-ms-overflow-style': 'scrollbar', // 5
    '-webkit-tap-highlight-color': new TinyColor('#000').setAlpha(0).toRgbString(), // 6
  },

  // Suppress the focus outline on elements that cannot be accessed via keyboard.
  // This prevents an unwanted focus outline from appearing around elements that
  // might still respond to pointer events.

  // Credit: https://github.com/suitcss/base
  [`[tabindex='-1']:focus`]: {
    outline: 'none !important',
  },

  // Content grouping
  //
  // 1. Add the correct box sizing in Firefox.
  // 2. Show the overflow in Edge and IE.

  hr: {
    boxSizing: 'content-box', // 1
    height: 0, // 1
    overflow: 'visible', // 2
  },

  //
  // Typography
  //

  // remove top margins from headings
  //
  // By default, `<h1>`-`<h6>` all receive top and bottom margins. We nuke the top
  // margin for easier control within type scales as it avoids margin collapsing.
  [`h1,
    h2,
    h3,
    h4,
    h5,
    h6`]: {
    marginTop: 0,
    marginBottom: '0.5em',
    color: token.colorTextHeading,
    fontWeight: 500,
  },

  // Reset margins on paragraphs
  //
  // Similarly, the top margin on `<p>`s get reset. However, we also reset the
  // bottom margin to use `em` units instead of `em`.
  p: {
    marginTop: 0,
    marginBottom: '1em',
  },

  // Abbreviations
  //
  // 1. remove the bottom border in Firefox 39-.
  // 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
  // 3. Add explicit cursor to indicate changed behavior.
  // 4. Duplicate behavior to the data-* attribute for our tooltip plugin

  [`abbr[title],
    abbr[data-original-title]`]: {
    // 4
    textDecoration: 'underline', // 2
    // textDecoration: 'underline dotted', // 2
    borderBottom: 0, // 1
    cursor: 'help', // 3
  },

  address: {
    marginBottom: '1em',
    fontStyle: 'normal',
    lineHeight: 'inherit',
  },

  [`input[type='text'],
    input[type='password'],
    input[type='number'],
    textarea`]: {
    '-webkit-appearance': 'none',
  },

  [`ol,
    ul,
    dl`]: {
    marginTop: 0,
    marginBottom: '1em',
  },

  [`ol ol,
  ul ul,
  ol ul,
  ul ol`]: {
    marginBottom: 0,
  },

  dt: {
    fontWeight: 500,
  },

  dd: {
    marginBottom: '0.5em',
    marginLeft: 0, // Undo browser default
  },

  blockquote: {
    margin: '0 0 1em',
  },

  dfn: {
    fontStyle: 'italic', // Add the correct font style in Android 4.3-
  },

  [`b,
  strong`]: {
    fontWeight: 'bolder', // Add the correct font weight in Chrome, Edge, and Safari
  },

  small: {
    fontSize: '80%', // Add the correct font size in all browsers
  },

  //
  // Prevent `sub` and `sup` elements from affecting the line height in
  // all browsers.
  //

  [`sub,
  sup`]: {
    position: 'relative',
    fontSize: '75%',
    lineHeight: 0,
    verticalAlign: 'baseline',
  },

  sub: {
    bottom: '-0.25em',
  },

  sup: {
    top: '-0.5em',
  },

  //
  // Links
  //

  a: {
    color: token.colorLink,
    textDecoration: token.linkDecoration,
    backgroundColor: 'transparent', // remove the gray background on active links in IE 10.
    outline: 'none',
    cursor: 'pointer',
    transition: `color ${token.motionDurationSlow}`,
    '-webkit-text-decoration-skip': 'objects', // remove gaps in links underline in iOS 8+ and Safari 8+.

    '&:hover': {
      color: token.colorLinkHover,
    },

    '&:active': {
      color: token.colorLinkActive,
    },

    [`&:active,
      &:hover`]: {
      textDecoration: token.linkHoverDecoration,
      outline: 0,
    },

    // https://github.com/ant-design/ant-design/issues/22503
    '&:focus': {
      textDecoration: token.linkFocusDecoration,
      outline: 0,
    },

    '&[disabled]': {
      color: token.colorTextDisabled,
      cursor: 'not-allowed',
    },
  },

  //
  // Code
  //

  [`pre,
  code,
  kbd,
  samp`]: {
    fontSize: '1em', // Correct the odd `em` font sizing in all browsers.
    fontFamily: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  },

  pre: {
    // remove browser default top margin
    marginTop: 0,
    // Reset browser default of `1em` to use `em`s
    marginBottom: '1em',
    // Don't allow content to break outside
    overflow: 'auto',
  },

  //
  // Figures
  //
  figure: {
    // Apply a consistent margin strategy (matches our type styles).
    margin: '0 0 1em',
  },

  //
  // Images and content
  //

  img: {
    verticalAlign: 'middle',
    borderStyle: 'none', // remove the border on images inside links in IE 10-.
  },

  // Avoid 300ms click delay on touch devices that support the `touch-action` CSS property.
  //
  // In particular, unlike most other browsers, IE11+Edge on Windows 10 on touch devices and IE Mobile 10-11
  // DON'T remove the click delay when `<meta name="viewport" content="width=device-width">` is present.
  // However, they DO support emoving the click delay via `touch-action: manipulation`.
  // See:
  // * https://getbootstrap.com/docs/4.0/content/reboot/#click-delay-optimization-for-touch
  // * http://caniuse.com/#feat=css-touch-action
  // * https://patrickhlauke.github.io/touch/tests/results/#suppressing-300ms-delay

  [`a,
  area,
  button,
  [role='button'],
  input:not([type='range']),
  label,
  select,
  summary,
  textarea`]: {
    touchAction: 'manipulation',
  },

  //
  // Tables
  //

  table: {
    borderCollapse: 'collapse', // Prevent double borders
  },

  caption: {
    paddingTop: '0.75em',
    paddingBottom: '0.3em',
    color: token.colorTextSecondary,
    textAlign: 'left',
    captionSide: 'bottom',
  },

  //
  // Forms
  //

  [`input,
  button,
  select,
  optgroup,
  textarea`]: {
    margin: 0, // remove the margin in Firefox and Safari
    color: 'inherit',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    lineHeight: 'inherit',
  },

  [`button,
  input`]: {
    overflow: 'visible', // Show the overflow in Edge
  },

  [`button,
  select`]: {
    textTransform: 'none', // remove the inheritance of text transform in Firefox
  },

  // 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`
  //    controls in Android 4.
  // 2. Correct the inability to style clickable types in iOS and Safari.
  [`button,
  html [type="button"], /* 1 */
  [type="reset"],
  [type="submit"]`]: {
    '-webkit-appearance': 'button', // 2
  },

  // remove inner border and padding from Firefox, but don't restore the outline like Normalize.
  [`button::-moz-focus-inner,
[type='button']::-moz-focus-inner,
[type='reset']::-moz-focus-inner,
[type='submit']::-moz-focus-inner`]: {
    padding: 0,
    borderStyle: 'none',
  },

  [`input[type='radio'],
  input[type='checkbox']`]: {
    boxSizing: 'border-box', // 1. Add the correct box sizing in IE 10-
    padding: 0, // 2. remove the padding in IE 10-
  },

  [`input[type='date'],
  input[type='time'],
  input[type='datetime-local'],
  input[type='month']`]: {
    // remove the default appearance of temporal inputs to avoid a Mobile Safari
    // bug where setting a custom line-height prevents text from being vertically
    // centered within the input.
    // See https://bugs.webkit.org/show_bug.cgi?id=139848
    // and https://github.com/twbs/bootstrap/issues/11266
    '-webkit-appearance': 'listbox',
  },

  textarea: {
    overflow: 'auto', // remove the default vertical scrollbar in IE.
    // Textareas should really only resize vertically so they don't break their (horizontal) containers.
    resize: 'vertical',
  },

  fieldset: {
    // Browsers set a default `min-width: min-content;` on fieldsets,
    // unlike e.g. `<div>`s, which have `min-width: 0;` by default.
    // So we reset that to ensure fieldsets behave more like a standard block element.
    // See https://github.com/twbs/bootstrap/issues/12359
    // and https://html.spec.whatwg.org/multipage/#the-fieldset-and-legend-elements
    minWidth: 0,
    margin: 0,
    // Reset the default outline behavior of fieldsets so they don't affect page layout.
    padding: 0,
    border: 0,
  },

  // 1. Correct the text wrapping in Edge and IE.
  // 2. Correct the color inheritance from `fieldset` elements in IE.
  legend: {
    display: 'block',
    width: '100%',
    maxWidth: '100%', // 1
    marginBottom: '0.5em',
    padding: 0,
    color: 'inherit', // 2
    fontSize: '1.5em',
    lineHeight: 'inherit',
    whiteSpace: 'normal', // 1
  },

  progress: {
    verticalAlign: 'baseline', // Add the correct vertical alignment in Chrome, Firefox, and Opera.
  },

  // Correct the cursor style of incement and decement buttons in Chrome.
  [`[type='number']::-webkit-inner-spin-button,
[type='number']::-webkit-outer-spin-button`]: {
    height: 'auto',
  },

  [`[type='search']`]: {
    // This overrides the extra rounded corners on search inputs in iOS so that our
    // `.form-control` class can properly style them. Note that this cannot simply
    // be added to `.form-control` as it's not specific enough. For details, see
    // https://github.com/twbs/bootstrap/issues/11586.
    outlineOffset: -2, // 2. Correct the outline style in Safari.
    '-webkit-appearance': 'none',
  },

  //
  // remove the inner padding and cancel buttons in Chrome and Safari on macOS.
  //

  [`[type='search']::-webkit-search-cancel-button,
  [type='search']::-webkit-search-decoration`]: {
    '-webkit-appearance': 'none',
  },

  //
  // 1. Correct the inability to style clickable types in iOS and Safari.
  // 2. Change font properties to `inherit` in Safari.
  //

  '::-webkit-file-upload-button': {
    font: 'inherit', // 2
    '-webkit-appearance': 'button', // 1
  },

  //
  // Correct element displays
  //

  output: {
    display: 'inline-block',
  },

  summary: {
    display: 'list-item', // Add the correct display in all browsers
  },

  template: {
    display: 'none', // Add the correct display in IE
  },

  // Always hide an element with the `hidden` HTML attribute (from PureCSS).
  // Needed for proper display in IE 10-.
  '[hidden]': {
    display: 'none !important',
  },

  mark: {
    padding: '0.2em',
    backgroundColor: token['yellow-1'],
  },

  '::selection': {
    color: token.colorTextLightSolid, // FIXME: colorTextInverse
    background: token.colorPrimary,
  },

  '.clearfix': {
    ...clearFix(),
  },
});

export default (disabled: boolean = false) => {
  const [theme, token] = useToken();

  return useStyleRegister({ theme, token, path: ['global-style'] }, () => {
    if (disabled) {
      return [];
    }

    return [genBasicStyle(token)];
  });
};
