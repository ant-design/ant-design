export function toList<T>(val: T | T[]): T[] {
  if (val === false) {
    return [false, false] as T[];
  }
  return Array.isArray(val) ? val : [val];
}

export function getNode(dom: React.ReactNode, defaultNode: React.ReactNode, needDom?: boolean) {
  if (dom === true || dom === undefined) {
    return defaultNode;
  }
  return dom || (needDom && defaultNode);
}

/**
 * Get React of element with precision.
 * ref: https://github.com/ant-design/ant-design/issues/50143
 */
export function getEleSize(
  ele: HTMLElement,
): [width: number, height: number, scrollWidth: number, scrollHeight: number] {
  const oriPosition = ele.style.position;

  // Create a new div to get the size
  ele.style.position = 'relative';
  const childDiv = document.createElement('div');
  childDiv.style.inset = '0';
  childDiv.style.position = 'absolute';

  // For test case
  if (process.env.NODE_ENV !== 'production') {
    childDiv.className = 'ant-typography-css-ellipsis-content-measure';
  }
  ele.appendChild(childDiv);

  const rect = ele.getBoundingClientRect();
  const { offsetWidth, offsetHeight, scrollWidth, scrollHeight } = ele;

  let returnWidth = offsetWidth;
  let returnHeight = offsetHeight;
  let returnScrollWidth = scrollWidth;
  let returnScrollHeight = scrollHeight;

  if (Math.abs(offsetWidth - rect.width) < 1 && Math.abs(offsetHeight - rect.height) < 1) {
    returnWidth = rect.width;
    returnHeight = rect.height;

    // Get children size
    const childRect = childDiv.getBoundingClientRect();
    returnScrollWidth = childRect.width;
    returnScrollHeight = childRect.height;
  }

  // Reset
  ele.removeChild(childDiv);
  ele.style.position = oriPosition;

  return [returnWidth, returnHeight, returnScrollWidth, returnScrollHeight];
}
