import showWaveEffect from './WaveEffect';

export default function useWave(
  nodeRef: React.RefObject<HTMLElement>,
  className: string,
): VoidFunction {
  function showWave() {
    const node = nodeRef.current!;

    // Skip if not exist doc
    const container = node.getRootNode?.() || node?.ownerDocument;
    if (container) {
      showWaveEffect(container, node, className);
    }
  }

  return showWave;
}
