import type { AnyObject } from '../_util/type';
import type { ColumnType } from './interface';

export interface ColumnProps<RecordType = AnyObject> extends ColumnType<RecordType> {
  children?: null;
}

/* istanbul ignore next */
/** This is a syntactic sugar for `columns` prop. So HOC will not work on this. */

const Column = <RecordType extends AnyObject>(_: ColumnProps<RecordType>) => null;

export default Column;
