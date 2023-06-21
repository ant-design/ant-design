import canUseDom from 'rc-util/lib/Dom/canUseDom';
import { isStyleSupport } from 'rc-util/lib/Dom/styleChecker';

export const canUseDocElement = () => canUseDom() && window.document.documentElement;

export { isStyleSupport };

let flexGapSupported: boolean;
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
