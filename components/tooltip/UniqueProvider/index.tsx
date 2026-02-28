import React from 'react';
import { UniqueProvider as RcUniqueProvider } from '@rc-component/trigger';
import type { BuildInPlacements } from '@rc-component/trigger';

import type { GetProp } from '../../_util/type';
import MotionContent from './MotionContent';

const cachedPlacements: [key: BuildInPlacements, target: BuildInPlacements] = [null!, null!];

function uniqueBuiltinPlacements(ori: BuildInPlacements): BuildInPlacements {
  if (cachedPlacements[0] !== ori) {
    const target: BuildInPlacements = {};
    Object.keys(ori).forEach((placement) => {
      target[placement] = {
        ...ori[placement],
        dynamicInset: false,
      };
    });
    cachedPlacements[0] = ori;
    cachedPlacements[1] = target;
  }
  return cachedPlacements[1];
}

const UniqueProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const renderPopup: GetProp<typeof RcUniqueProvider, 'postTriggerProps'> = (options) => {
    const { id, builtinPlacements, popup } = options;

    const popupEle = typeof popup === 'function' ? popup() : popup;

    const parsedPlacements = uniqueBuiltinPlacements(builtinPlacements!);

    return {
      ...options,
      getPopupContainer: null!,
      arrow: false as any,
      popup: <MotionContent key={id}>{popupEle}</MotionContent>,
      builtinPlacements: parsedPlacements,
    };
  };

  return <RcUniqueProvider postTriggerProps={renderPopup}>{children}</RcUniqueProvider>;
};

export default UniqueProvider;
