import type { ComponentToken } from './style';
import showWaveEffect from './WaveEffect';

export default function useWave(
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
  waveToken?: ComponentToken,
): VoidFunction {
  function showWave() {
    const node = nodeRef.current!;

    showWaveEffect(node, className, waveToken);
  }

  return showWave;
}
