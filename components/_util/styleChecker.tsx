export const isStyleSupport = (styleName: string | Array<string>): boolean => {
  if (typeof window !== 'undefined' && window.document && window.document.documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const { documentElement } = window.document;

    return styleNameList.some(name => name in documentElement.style);
  }
  return false;
};

export const isFlexSupported = isStyleSupport(['flex', 'webkitFlex', 'Flex', 'msFlex']);
