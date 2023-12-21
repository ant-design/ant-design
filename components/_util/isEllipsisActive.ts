function checkRanges(el: HTMLElement): boolean {
  if (
    typeof Range !== 'undefined' &&
    Object.prototype.isPrototypeOf.call(Range.prototype, document.createRange())
  ) {
    const range = new Range();
    range.selectNodeContents(el);

    const rangeRect = range.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    return rangeRect.right > elRect.right;
  }
  return false;
}

const isEllipsisActive = (el: HTMLElement) =>
  el.scrollWidth !== el.offsetWidth ? el.scrollWidth > el.offsetWidth : checkRanges(el);

export default isEllipsisActive;
