export function getLineHeight(fontSize: number) {
  return (fontSize + 8) / fontSize;
}

// https://zhuanlan.zhihu.com/p/32746810
export default function getFontSizes(base: number) {
  const fontSizes = new Array(10).fill(null).map((_, index) => {
    const i = index - 1;
    const baseSize = base * 2.71828 ** (i / 5);
    const intSize = index > 1 ? Math.floor(baseSize) : Math.ceil(baseSize);

    // Convert to even
    return Math.floor(intSize / 2) * 2;
  });

  fontSizes[1] = base;

  return fontSizes.map((size) => ({
    size,
    lineHeight: getLineHeight(size),
  }));
}
