import * as React from 'react';
import useEvent from 'rc-util/lib/hooks/useEvent';
import showWaveEffect from './WaveEffect';
import { ConfigContext } from '../../config-provider';
import useToken from '../../theme/useToken';
import type { GlobalToken } from '../../theme';

export type ShowWaveEffect = (
  element: HTMLElement,
  info: {
    className: string;
    token: GlobalToken;
    component?: string;
    event: MouseEvent;
  },
) => void;

export default function useWave(
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
  component?: string,
) {
  const { wave } = React.useContext(ConfigContext);
  const [, token] = useToken();

  const showWave = useEvent((event: MouseEvent) => {
    const node = nodeRef.current!;

    if (wave?.disabled || !node) {
      return;
    }

    const { showEffect } = wave || {};

    // Customize wave effect
    (showEffect || showWaveEffect)(node, { className, token, component, event });
  });

  return showWave;
}
