import { spacing } from './spacing';
import { color } from './colors';
import { fontWeight } from './fontWeight';

// font
const font = {
  size: '16px',
  weight: {
    regular: fontWeight.regular,
    bold: fontWeight.bold,
  },
  family:{
    sansSerif: 'Lato,"Lucida Grande",Tahoma,"Helvetica Neue",Helvetica,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    serif: 'Volkhov,Georgia,Times,Serif',
    headline: 'Lato,"Helvetica Neue",Helvetica,-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
    code: '"Roboto Mono",SFMono-Regular,Consolas,"Liberation Mono",Menlo,Courier,monospace',
  },
};

// headlines
const h1 = {
  fontFamily: font.family.headline,
  fontSize: '46px',
  lineHeight: 50 / 46,
  fontWeight: font.weight.bold,
};
const h2 = {
  fontFamily: font.family.headline,
  fontSize: '36px',
  lineHeight: 40 / 36,
  fontWeight: font.weight.bold,
};
const h3 = {
  fontFamily: font.family.headline,
  fontSize: '30px',
  lineHeight: 36 / 30,
  fontWeight: font.weight.bold,
};
const h4 = {
  fontFamily: font.family.headline,
  fontSize: '24px',
  lineHeight: 28 / 24,
  fontWeight: font.weight.bold,
};
const h5 = {
  fontFamily: font.family.headline,
  fontSize: '18px',
  lineHeight: 22 / 18,
  fontWeight: font.weight.bold,
};
const h6 = {
  fontFamily: font.family.headline,
  fontSize: '13px',
  lineHeight: 18 / 13,
  fontWeight: font.weight.regular,
};

// body
const bodyJumbo = {
  fontFamily: font.family.sansSerif,
  fontSize: '24px',
  lineHeight: 36 / 24,
};
const bodyBig = {
  fontFamily: font.family.sansSerif,
  fontSize: '18px',
  lineHeight: 27 / 18,
};
const body = {
  fontFamily: font.family.sansSerif,
  fontSize: '16px',
  lineHeight: 22 / 16,
};
const bodyBold = {
  fontFamily: body.fontFamily,
  fontSize: body.fontSize,
  lineHeight: body.lineHeight,
  fontWeight: font.weight.bold,
};
const bodySmall = {
  fontFamily: font.family.sansSerif,
  fontSize: '14px',
  lineHeight: 20 / 14,
};
const bodySmallBold = {
  fontFamily: bodySmall.fontFamily,
  fontSize: bodySmall.fontSize,
  lineHeight: bodySmall.lineHeight,
  fontWeight: font.weight.bold,
};
const bodyMicro = {
  fontFamily: font.family.sansSerif,
  fontSize: '13px',
  lineHeight: 18 / 13,
};
const notification = {
  fontFamily: font.family.sansSerif,
  fontSize: '14px',
  lineHeight: 18 / 14,
};
const notificationBold = {
  fontFamily: notification.fontFamily,
  fontSize: notification.fontSize,
  lineHeight: notification.lineHeight,
  fontWeight: font.weight.bold,
};

// attribution
const quote = {
  fontFamily: font.family.serif,
  fontSize: '30px',
  lineHeight: 42 / 30,
  fontWeight: font.weight.regular,
};
const author = {
  fontFamily: font.family.serif,
  fontSize: '18px',
  lineHeight: 36 / 18,
};

// code
const code = {
  fontFamily: font.family.code,
  fontSize: '13px',
  lineHeight: 18 / 13,
  contrastBackgroundColor: color.N10,
  contrastColor: color.N5,
  padding: spacing.lg,
};

export function getFontImportsURL() {
  const sansSerifFont = `${font.family.sansSerif.split(',')[0]}:${[fontWeight.regular, fontWeight.bold].join(',')}`;
  const serifFont = `${font.family.serif.split(',')[0]}:${[fontWeight.regular, fontWeight.bold].join(',')}`;
  const codeFont = `${font.family.code.split(',')[0]}:${[fontWeight.regular, fontWeight.bold].join(',')}`;
  return `https://fonts.googleapis.com/css?family=${[sansSerifFont, serifFont, codeFont].join('|')}`;
}

export const typography = {
  font,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  bodyJumbo,
  bodyBig,
  body,
  bodyBold,
  bodySmall,
  bodySmallBold,
  bodyMicro,
  notification,
  notificationBold,
  quote,
  author,
  code,
};
