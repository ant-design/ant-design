import type { CSSObject, CssUtil } from 'antd-style';

export const withPriority = (css: CssUtil, style: CSSObject) =>
  css({
    '&&&': style,
  });
