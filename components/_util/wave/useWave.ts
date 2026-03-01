import * as React from 'react';
import { useEvent } from '@rc-component/util';
import raf from '@rc-component/util/lib/raf';

import type { WaveProps } from '.';
import { ConfigContext } from '../../config-provider';
import useToken from '../../theme/useToken';
import { TARGET_CLS } from './interface';
import type { ShowWave, WaveComponent } from './interface';
import showWaveEffect from './WaveEffect';

const useWave = (
  nodeRef: React.RefObject<HTMLElement | null>,
  className: string,
  component?: WaveComponent,
  colorSource?: WaveProps['colorSource'],
) => {
  const { wave } = React.useContext(ConfigContext);
  const [, token, hashId] = useToken();

  const showWave = useEvent<ShowWave>((event) => {
    const node = nodeRef.current;

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

  const rafIdRef = React.useRef<number>(null);

  // Clean up RAF on unmount to prevent memory leaks and stale callbacks
  React.useEffect(
    () => () => {
      raf.cancel(rafIdRef.current!);
    },
    [],
  );

  // Merge trigger event into one for each frame
  const showDebounceWave: ShowWave = (event) => {
    raf.cancel(rafIdRef.current!);

    rafIdRef.current = raf(() => {
      showWave(event);
    });
  };

  return showDebounceWave;
};

export default useWave;
