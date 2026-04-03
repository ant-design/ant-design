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

// Cache for ellipsis check results to avoid expensive DOM operations
interface EllipsisCache {
  width: number;
  height: number;
  scrollWidth: number;
  scrollHeight: number;
  children: number;
  isEllipsis: boolean;
}

const ellipsisCache = new WeakMap<HTMLElement, EllipsisCache>();

/**
 * Check for element is native ellipsis
 * ref:
 * - https://github.com/ant-design/ant-design/issues/50143
 * - https://github.com/ant-design/ant-design/issues/50414
 */
function isEleEllipsisInternal(ele: HTMLElement): boolean {
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
    rect.left > childRect.left ||
    childRect.right > rect.right ||
    // Vertical out of range
    rect.top > childRect.top ||
    childRect.bottom > rect.bottom
  );
}

/**
 * Cached version of isEleEllipsis to avoid expensive DOM operations when element hasn't changed
 */
export function isEleEllipsis(ele: HTMLElement): boolean {
  const rect = ele.getBoundingClientRect();
  const cached = ellipsisCache.get(ele);

  // Check if we can use cached result
  // Only recalculate if element dimensions or content changed
  if (cached) {
    const sameSize =
      cached.width === rect.width &&
      cached.height === rect.height &&
      cached.scrollWidth === ele.scrollWidth &&
      cached.scrollHeight === ele.scrollHeight &&
      cached.children === ele.childNodes.length;

    if (sameSize) {
      return cached.isEllipsis;
    }
  }

  // Perform expensive check
  const result = isEleEllipsisInternal(ele);

  // Cache result with current element state
  ellipsisCache.set(ele, {
    width: rect.width,
    height: rect.height,
    scrollWidth: ele.scrollWidth,
    scrollHeight: ele.scrollHeight,
    children: ele.childNodes.length,
    isEllipsis: result,
  });

  return result;
}

export const isValidText = (val: any): val is string | number =>
  ['string', 'number'].includes(typeof val);
