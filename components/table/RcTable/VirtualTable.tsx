import { genVirtualTable } from 'rc-table';

import type { AnyObject } from '../../_util/type';
import type { InternalTableProps } from '../InternalTable';

/**
 * Same as `rc-table` but we modify trigger children update logic instead.
 */
const RcVirtualTable = genVirtualTable((prev, next) => {
  const { _renderTimes: prevRenderTimes } = prev as Readonly<InternalTableProps<AnyObject>>;
  const { _renderTimes: nextRenderTimes } = next as Readonly<InternalTableProps<AnyObject>>;
  return prevRenderTimes !== nextRenderTimes;
});

export default RcVirtualTable;
