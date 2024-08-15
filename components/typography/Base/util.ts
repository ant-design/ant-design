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
export function getEleSize(ele: HTMLElement): [width: number, height: number] {
  const rect = ele.getBoundingClientRect();
  const { offsetWidth, offsetHeight } = ele;

  let returnWidth = offsetWidth;
  let returnHeight = offsetHeight;

  if (Math.abs(offsetWidth - rect.width) < 1 && Math.abs(offsetHeight - rect.height) < 1) {
    returnWidth = rect.width;
    returnHeight = rect.height;
  }

  return [returnWidth, returnHeight];
}
