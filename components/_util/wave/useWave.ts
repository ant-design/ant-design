import showWaveEffect from './WaveEffect';

export default function useWave(
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
): VoidFunction {
  function showWave() {
    const node = nodeRef.current!;

    showWaveEffect(node, className);
  }

  return showWave;
}
