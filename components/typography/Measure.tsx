import * as React from 'react';
import * as ReactDOM from 'react-dom';
import toArray from 'rc-util/lib/Children/toArray';

export interface MeasureProps {
  children: React.ReactNode;
}

let ellipsisContainer: HTMLDivElement;

function getContainer() {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div');

    ellipsisContainer.setAttribute('aria-hidden', 'true');
    ellipsisContainer.style.position = 'fixed';
    ellipsisContainer.style.left = '0';
    ellipsisContainer.style.top = '-999999px';
    ellipsisContainer.style.zIndex = '-1000';
  }

  // HMR will remove this from body which should patch back
  if (!ellipsisContainer.parentNode) {
    document.body.appendChild(ellipsisContainer);
  }

  return ellipsisContainer;
}

export default ({ children }: MeasureProps) => {
  const [walking, setWalking] = React.useState(false);
  const [renderLength, setRenderLength] = React.useState(0);
  const childList = React.useMemo(() => toArray(children), [children]);
  const length = React.useMemo(() => {
    let len = 0;

    childList.forEach(child => {
      if (typeof child === 'string' || typeof child === 'number') {
        len += String(child).length;
      } else {
        len += 1;
      }
    });

    return len;
  }, [childList]);

  React.useEffect(() => {
    setWalking(false);
  }, [children]);

  return ReactDOM.createPortal(children, getContainer());
};
