import { createContext } from 'react';
import type { SliderProps as RcSliderProps } from 'rc-slider';

import type { DirectionType } from '../config-provider';

export interface SliderInternalContextProps {
  handleRender?: RcSliderProps['handleRender'];
  direction?: DirectionType;
}

/** @private Internal context. Do not use in your production. */
const SliderInternalContext = createContext<SliderInternalContextProps>({});

export default SliderInternalContext;
