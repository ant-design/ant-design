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

export default WatermarkContext;
