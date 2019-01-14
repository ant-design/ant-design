let ellipsisText: HTMLParagraphElement;

function pxToNumber(value: string | null): number {
  if (!value) return 0;

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

export function measure(text: string, lines: number, originEle: HTMLParagraphElement) {
  if (!ellipsisText) {
    ellipsisText = document.createElement('p');
    ellipsisText.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ellipsisText);
  }

  // Get origin style
  const originStyle = window.getComputedStyle(originEle);
  const originCSS = originStyle.cssText;
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = lineHeight * lines + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom);

  // Set shadow
  ellipsisText.innerHTML = text;
  ellipsisText.setAttribute('style', originCSS);
  ellipsisText.style.position = 'fixed';
  ellipsisText.style.top = '0';
  ellipsisText.style.left = '0';
  ellipsisText.style.height = 'auto';
  ellipsisText.style.minHeight = 'auto';
  ellipsisText.style.maxHeight = 'auto';

  function findMatchText(startLoc: number = 0, endLoc: number = text.length) {
    const currentText = text.slice(0, startLoc);
    ellipsisText.innerHTML = currentText;

    if (ellipsisText.offsetHeight <= maxHeight) return text;
  }

  // console.log('>>>>>>', lineHeight);
  // console.log('Match >>>', findMatchText());
}