import toList from '../../_util/toList';

export const toCopyConfigList = <T>(val: T | T[]): T[] => {
  if (val === false) {
    return [false, false] as T[];
  }
  return toList(val);
};

export function getNode(dom: React.ReactNode, defaultNode: React.ReactNode, needDom?: boolean) {
  if (dom === true || dom === undefined) {
    return defaultNode;
  }
  return dom || (needDom && defaultNode);
}

/**
 * Check for element is native ellipsis
 * ref:
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 */
export function isEleEllipsis(ele: HTMLElement): boolean {
  // Create a new node to probe the layout box.
  const childDiv = document.createElement('em');

  // The probe is only used to detect whether the content overflows the
  // container, so it must not contribute any size of its own. As an inline
  // element, its `getBoundingClientRect` height comes from the font box
  // (ascent + descent) regardless of `line-height`. When `line-height` is
  // smaller than the font box (e.g. a 14px font with an 18px line on some
  // font families), the probe would stick out vertically and report a false
  // overflow even though the text is not clamped. Collapsing it to a zero
  // sized inline-block keeps the horizontal detection (see #50143 / #50414)
  // while avoiding the vertical false positive (see #56347).
  // `margin`, `padding` and `border-width` are also reset so that global
  // stylesheets targeting `em` (resets or custom styles) can not re-introduce
  // any size and bring back the false positive.
  childDiv.style.display = 'inline-block';
  childDiv.style.width = '0';
  childDiv.style.height = '0';
  childDiv.style.margin = '0';
  childDiv.style.padding = '0';
  childDiv.style.borderWidth = '0';
  ele.appendChild(childDiv);

  // For test case
  if (process.env.NODE_ENV !== 'production') {
    childDiv.className = 'ant-typography-css-ellipsis-content-measure';
  }

  const rect = ele.getBoundingClientRect();
  const childRect = childDiv.getBoundingClientRect();

  // Reset
  ele.removeChild(childDiv);

  // Range checker
  return (
    // Horizontal out of range
    rect.left > childRect.left ||
    childRect.right > rect.right ||
    // Vertical out of range
    rect.top > childRect.top ||
    childRect.bottom > rect.bottom
  );
}

export const isValidText = (val: any): val is string | number =>
  ['string', 'number'].includes(typeof val);
