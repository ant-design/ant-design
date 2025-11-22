import { genTable } from '@rc-component/table';

import type { AnyObject } from '../../_util/type';
import type { InternalTableProps } from '../InternalTable';

/**
 * Same as `rc-component/table` but we modify trigger children update logic instead.
 */
const RcTable = genTable((prev, next) => {
  const { _renderTimes: prevRenderTimes } = prev as Readonly<InternalTableProps<AnyObject>>;
  const { _renderTimes: nextRenderTimes } = next as Readonly<InternalTableProps<AnyObject>>;
  return prevRenderTimes !== nextRenderTimes;
});

export default RcTable;
