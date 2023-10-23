import { useEvent } from 'rc-util';
import * as React from 'react';

export interface WatermarkContextProps {
  add: (ele: HTMLElement) => void;
  remove: (ele: HTMLElement) => void;
}

function voidFunc() {}

const WatermarkContext = React.createContext<WatermarkContextProps>({
  add: voidFunc,
  remove: voidFunc,
});

export function usePanelRef(panelSelector?: string) {
  const watermark = React.useContext(WatermarkContext);

  const panelEleRef = React.useRef<HTMLElement>();
  const panelRef = useEvent((ele: HTMLElement | null) => {
    if (ele) {
      const innerContentEle = panelSelector ? ele.querySelector<HTMLElement>(panelSelector)! : ele;
      watermark.add(innerContentEle);
      panelEleRef.current = innerContentEle;
    } else {
      watermark.remove(panelEleRef.current!);
    }
  });

  return panelRef;
}

export default WatermarkContext;
