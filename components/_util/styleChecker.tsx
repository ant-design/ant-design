import canUseDom from 'rc-util/lib/Dom/canUseDom';

export const canUseDocElement = () => canUseDom() && window.document.documentElement;

export const isStyleSupport = (styleName: string | Array<string>): boolean => {
  if (canUseDocElement()) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName];
    const { documentElement } = window.document;

    return styleNameList.some(name => name in documentElement.style);
  }
  return false;
};
