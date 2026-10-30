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
  // Create a new div to get the size
  const childDiv = document.createElement('em');
  ele.appendChild(childDiv);

  // For test case
  if (process.env.NODE_ENV !== 'production') {
    childDiv.className = 'ant-typography-css-ellipsis-content-measure';
  }

  const rect = ele.getBoundingClientRect();
  const childRect = childDiv.getBoundingClientRect();

  // Reset
  ele.removeChild(childDiv);

  // Browser zoom can introduce tiny differences between the two DOMRects.
  const horizontalTolerance = 0.001;

  // Range checker
  return (
    // Horizontal out of range
    rect.left - childRect.left > horizontalTolerance ||
    childRect.right - rect.right > horizontalTolerance ||
    // Vertical out of range
    rect.top > childRect.top ||
    childRect.bottom > rect.bottom
  );
}

export const isValidText = (val: any): val is string | number =>
  ['string', 'number'].includes(typeof val);
