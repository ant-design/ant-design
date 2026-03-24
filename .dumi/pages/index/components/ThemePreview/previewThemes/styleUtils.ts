export const withPriority = (
  css: (style: Record<string, unknown>) => string,
  style: Record<string, unknown>,
) =>
  css({
    '&&&': style,
  });
