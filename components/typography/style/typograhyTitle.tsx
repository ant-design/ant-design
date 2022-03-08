/*
.typography-title(@fontSize; @fontWeight; @lineHeight; @headingColor; @headingMarginBottom;) {
  margin-bottom: @headingMarginBottom;
  color: @headingColor;
  font-weight: @fontWeight;
  font-size: @fontSize;
  line-height: @lineHeight;
}
*/
import type { DerivativeToken } from '../../_util/theme';

export function getTitleStyles({
  fontSize,
  lineHeight,
  token,
}: {
  fontSize: string;
  lineHeight: number;
  token: DerivativeToken;
}) {
  return {
    marginBottom: token.headingMarginBottom,
    color: token.headingColor,
    fontWeight: token.fontWeight,
    fontSize,
    lineHeight,
  };
}
