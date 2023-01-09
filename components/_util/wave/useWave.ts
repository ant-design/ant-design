import useEvent from 'rc-util/lib/hooks/useEvent';
import type { ConfigProviderProps } from '../../config-provider';
import showWaveEffect from './WaveEffect';
import type { useToken } from '../../theme/internal';

export default function useWave(
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
  token: ReturnType<typeof useToken>,
  wave: ConfigProviderProps['wave'],
): VoidFunction {
  function showWave() {
    const node = nodeRef.current!;

    showWaveEffect(node, className, token, wave);
  }

  return useEvent(showWave);
}
