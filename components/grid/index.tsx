import Col from './col';
import useInternalBreakpoint from './hooks/useBreakpoint';
import Row from './row';

// Do not export params
function useBreakpoint() {
  return useInternalBreakpoint();
}

export { ColProps, ColSize } from './col';
export { RowProps } from './row';
export { Row, Col };

export default { useBreakpoint };
