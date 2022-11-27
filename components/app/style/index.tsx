import type { FullToken, GenerateStyle } from '../../theme';
import { genComponentStyleHook, mergeToken } from '../../theme';

export interface ComponentToken {}

interface AppToken extends FullToken<'Tour'> {
  sliderWidth: number;
  sliderHeight: number;
}

// =============================== Base ===============================
const genBaseStyle: GenerateStyle<AppToken> = () => [
  {
    'html, body': {
      width: '100%',
      height: '100%',
    },
    'input::-ms-clear,input::-ms-reveal': {
      display: 'none',
    },
    '*, *::before, *::after': {
      boxSizing: 'border-box',
    },
    html: {
      fontFamily: 'sans-serif',
      lineHeight: 1.15,
      WebkitTextSizeAdjust: '100%',
      MsTextSizeAdjust: '100%',
      MsOverflowStyle: 'scrollbar',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    },
    '@-ms-viewport': {
      width: 'device-width',
    },
    body: {
      margin: 0,
    },
    "[tabindex='-1']:focus": {
      outline: 'none',
    },
    hr: {
      boxSizing: 'content-box',
      height: 0,
      overflow: 'visible',
    },
    'h1, h2, h3, h4, h5, h6': {
      marginTop: 0,
      marginBottom: '0.5em',
      fontWeight: '500',
    },
    p: {
      marginTop: '0',
      marginBottom: '1em',
    },
    'abbr[title],abbr[data-original-title]': {
      WebkitTextDecoration: 'underline dotted',
      textDecoration: 'underline dotted',
      borderBottom: '0',
      cursor: 'help',
    },
    address: {
      marginBottom: '1em',
      fontStyle: 'normal',
      lineHeight: 'inherit',
    },
    "input[type='text'],input[type='password'],input[type='number'],textarea": {
      WebkitAppearance: 'none',
    },
    'ol, ul, dl': {
      marginTop: 0,
      marginBottom: '1em',
    },
    'ol ol, ul ul, ol ul, ul ol': {
      marginBottom: 0,
    },
    dt: {
      fontWeight: 500,
    },
    dd: {
      marginBottom: '0.5em',
      marginLeft: 0,
    },
    blockquote: {
      margin: '0 0 1em',
    },
    dfn: {
      fontStyle: 'italic',
    },
    'b, strong': {
      fontWeight: 'bolder',
    },
    small: {
      fontSize: '80%',
    },
    'sub, sup': {
      position: 'relative',
      fontSize: '75%',
      lineHeight: '0',
      verticalAlign: 'baseline',
    },
    sub: {
      bottom: '-0.25em',
    },
    sup: {
      top: '-0.5em',
    },
    'pre, code, kbd, samp': {
      fontSize: '1em',
      fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    },
    pre: {
      marginTop: '0',
      marginBottom: '1em',
      overflow: 'auto',
    },
    figure: {
      margin: '0 0 1em',
    },
    img: {
      verticalAlign: 'middle',
      borderStyle: 'none',
    },
    "a, area, button, [role='button'], input:not([type='range']), label, select, summary, textarea":
      {
        touchAction: 'manipulation',
      },
    table: {
      borderCollapse: 'collapse',
    },
    caption: {
      paddingTop: '0.75em',
      paddingBottom: '0.3em',
      textAlign: 'left',
      captionSide: 'bottom',
    },
    'input, button, select, optgroup, textarea': {
      margin: '0',
      color: 'inherit',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      lineHeight: 'inherit',
    },
    'button, input': {
      overflow: 'visible',
    },
    'button, select': {
      textTransform: 'none',
    },
    "button, html [type='button'], [type='reset'], [type='submit']": {
      WebkitAppearance: 'button',
    },
    "button::-moz-focus-inner, [type='button']::-moz-focus-inner, [type='reset']::-moz-focus-inner, [type='submit']::-moz-focus-inner":
      {
        padding: '0',
        borderStyle: 'none',
      },
    "input[type='radio'], input[type='checkbox']": {
      boxSizing: 'border-box',
      padding: '0',
    },
    "input[type='date'], input[type='time'], input[type='datetime-local'], input[type='month']": {
      WebkitAppearance: 'listbox',
    },
    textarea: {
      overflow: 'auto',
      resize: 'vertical',
    },
    fieldset: {
      minWidth: 0,
      margin: 0,
      padding: 0,
      border: 0,
    },
    legend: {
      display: 'block',
      width: '100%',
      maxWidth: '100%',
      marginBottom: '0.5em',
      padding: 0,
      color: 'inherit',
      fontSize: '1.5em',
      lineHeight: 'inherit',
      whiteSpace: 'normal',
    },
    progress: {
      verticalAlign: 'baseline',
    },
    "[type='number']::-webkit-inner-spin-button, [type='number']::-webkit-outer-spin-button": {
      height: 'auto',
    },
    "[type='search']": {
      outlineOffset: '-2px',
      WebkitAppearance: 'none',
    },
    "[type='search']::-webkit-search-cancel-button, [type='search']::-webkit-search-decoration": {
      WebkitAppearance: 'none',
    },
    '::-webkit-file-upload-button': {
      font: 'inherit',
      WebkitAppearance: 'button',
    },
    output: {
      display: 'inline-block',
    },
    summary: {
      display: 'list-item',
    },
    template: {
      display: 'none',
    },
    '[hidden]': {
      display: 'none !important',
    },
    mark: {
      padding: '0.2em',
      backgroundColor: '#feffe6',
    },
  },
];

// ============================== Export ==============================
export default genComponentStyleHook('antdApp', (token) => {
  const AppToken = mergeToken<AppToken>(token, {
    sliderWidth: 6,
    sliderHeight: 6,
  });
  return [genBaseStyle(AppToken)];
});
