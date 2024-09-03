import Col from './col';
import useInternalBreakpoint from './hooks/useBreakpoint';
import Row from './row';

// Do not export params
function useBreakpoint() {
  return useInternalBreakpoint();
}

export type { ColProps, ColSize } from './col';
export type { RowProps } from './row';
export { Col, Row };

export default { useBreakpoint };
