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

// Browser zoom can leave tiny float errors in DOMRect values
const RECT_PRECISION = 0.001;

/**
 * Check for element is native ellipsis
 * ref:
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 * - https://github.com/ant-design/ant-design/issues/59488
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

  // Range checker
  return (
    // Horizontal out of range
    rect.left - childRect.left > RECT_PRECISION ||
    childRect.right - rect.right > RECT_PRECISION ||
    // Vertical out of range
    rect.top - childRect.top > RECT_PRECISION ||
    childRect.bottom - rect.bottom > RECT_PRECISION
  );
}

export const isValidText = (val: any): val is string | number =>
  ['string', 'number'].includes(typeof val);
