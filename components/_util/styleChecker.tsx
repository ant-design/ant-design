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

let flexGapSupported: boolean | undefined;
export const detectFlexGapSupported = () => {
  if (!canUseDocElement()) {
    return false;
  }

  if (flexGapSupported !== undefined) {
    return flexGapSupported;
  }

  // create flex container with row-gap set
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  // create two, elements inside it
  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  // append to the DOM (needed to obtain scrollHeight)
  document.body.appendChild(flex);
  flexGapSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
  document.body.removeChild(flex);

  return flexGapSupported;
};
