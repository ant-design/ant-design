import repeat from 'lodash/repeat';

const ELLIPSIS = '...';
const OFFSET_MOCK_STR = '<span style="display: inline-block; width: 2em;">.</span>'; // We need use mock string to measure the icon of text

let ellipsisText: HTMLParagraphElement;

function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

export function measure(
  text: string,
  lines: number,
  originEle: HTMLParagraphElement,
  offset: number,
) {
  if (!ellipsisText) {
    ellipsisText = document.createElement('div');
    ellipsisText.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ellipsisText);
  }

  const offsetPlaceholder = repeat(OFFSET_MOCK_STR, offset);

  // Get origin style
  const originStyle = window.getComputedStyle(originEle);
  const originCSS = originStyle.cssText;
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight =
    lineHeight * lines + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom);

  // Set shadow
  ellipsisText.innerHTML = `${text}${offsetPlaceholder}`;
  ellipsisText.setAttribute('style', originCSS);
  ellipsisText.style.position = 'fixed';
  ellipsisText.style.top = '-999999px';
  ellipsisText.style.left = '0';
  ellipsisText.style.zIndex = '-1000';
  ellipsisText.style.height = 'auto';
  ellipsisText.style.minHeight = 'auto';
  ellipsisText.style.maxHeight = 'auto';

  // Skip ellipsis if already match
  if (ellipsisText.offsetHeight <= maxHeight) {
    return text;
  }

  function findMatchText(startLoc: number = 0, endLoc: number = text.length): string {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    const currentText = `${text.slice(0, midLoc)}${ELLIPSIS}`;
    ellipsisText.innerHTML = `${currentText}${offsetPlaceholder}`;

    // Find the match location
    if (startLoc === midLoc) return currentText;

    if (ellipsisText.offsetHeight <= maxHeight) {
      return findMatchText(midLoc, endLoc);
    } else {
      return findMatchText(startLoc, midLoc);
    }
  }

  return findMatchText();
}
