import { genVirtualTable } from 'rc-table';
import type { InternalTableProps } from '../InternalTable';

/**
 * Same as `rc-table` but we modify trigger children update logic instead.
 */
export default genVirtualTable((prev, next) => {
  const { _renderTimes: prevRenderTimes } = prev as InternalTableProps<any>;
  const { _renderTimes: nextRenderTimes } = next as InternalTableProps<any>;

  return prevRenderTimes !== nextRenderTimes;
});
