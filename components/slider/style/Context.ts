import { createContext } from 'react';
import type { SliderProps as RcSliderProps } from 'rc-slider';

export interface SliderInternalContextProps {
  handleRender?: RcSliderProps['handleRender'];
  direction?: 'ltr' | 'rtl';
}

/** @private Internal context. Do not use in your production. */
const SliderInternalContext = createContext<SliderInternalContextProps>({});

export default SliderInternalContext;
