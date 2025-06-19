import * as React from 'react';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import raf from '@rc-component/util/lib/raf';

import { ConfigContext } from '../../config-provider';
import useToken from '../../theme/useToken';
import { TARGET_CLS } from './interface';
import type { ShowWave, WaveComponent } from './interface';
import showWaveEffect from './WaveEffect';
import type { WaveProps } from '.';

const useWave = (
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
  component?: WaveComponent,
  colorSource?: WaveProps['colorSource'],
) => {
  const { wave } = React.useContext(ConfigContext);
  const [, token, hashId] = useToken();

  const showWave = useEvent<ShowWave>((event) => {
    const node = nodeRef.current!;

    if (wave?.disabled || !node) {
      return;
    }

    const targetNode = node.querySelector<HTMLElement>(`.${TARGET_CLS}`) || node;

    const { showEffect } = wave || {};

    // Customize wave effect
    (showEffect || showWaveEffect)(targetNode, {
      className,
      token,
      component,
      event,
      hashId,
      colorSource,
    });
  });

  const rafId = React.useRef<number>(null);

  // Merge trigger event into one for each frame
  const showDebounceWave: ShowWave = (event) => {
    raf.cancel(rafId.current!);

    rafId.current = raf(() => {
      showWave(event);
    });
  };

  return showDebounceWave;
};

export default useWave;
