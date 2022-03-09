/*
.typography-title(@fontSize; @fontWeight; @lineHeight; @headingColor; @headingMarginBottom;) {
  margin-bottom: @headingMarginBottom;
  color: @headingColor;
  font-weight: @fontWeight;
  font-size: @fontSize;
  line-height: @lineHeight;
}
*/
import { CSSObject } from '@ant-design/cssinjs';
import type { DerivativeToken } from '../../_util/theme';

// Typography
// ---
/*
@typography-title-font-weight: 600;
@typography-title-margin-top: 1.2em;
@typography-title-margin-bottom: 0.5em;
*/
const typographyToken = {
  titleFontWeight: 600,
  titleMarginBottom: '0.5em',
};

// eslint-disable-next-line import/prefer-default-export
const getTitleStyle = ({
  fontSize,
  lineHeight,
  color,
}: {
  fontSize: number;
  lineHeight: number;
  color: string;
}) => ({
  marginBottom: typographyToken.titleMarginBottom,
  color,
  fontWeight: typographyToken.titleFontWeight,
  fontSize,
  lineHeight,
});

// eslint-disable-next-line import/prefer-default-export
export const getTitleStyles = (token: DerivativeToken) => {
  const lineHeights = [1.23, 1.35, 1.35, 1.4, 1.5];
  const styles = {} as CSSObject;
  lineHeights.forEach((lineHeight, i) => {
    styles[
      `
      h${i + 1}&,
      div&-h${i + 1},
      div&-h${i + 1} > textarea,
      h${i + 1}
  `
    ] = getTitleStyle({
      fontSize: (token as any)[`heading${i + 1}Size`],
      lineHeight,
      color: token.headingColor,
    });
  });
  return styles;
};
