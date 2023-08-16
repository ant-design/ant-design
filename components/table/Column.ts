import type { ColumnType } from './interface';

export interface ColumnProps<RecordType> extends ColumnType<RecordType> {
  children?: null;
}

/* c8 ignore start */
/** This is a syntactic sugar for `columns` prop. So HOC will not work on this. */
// eslint-disable-next-line no-unused-vars
function Column<RecordType>(_: ColumnProps<RecordType>) {
  return null;
}

export default Column;
/* c8 ignore stop */
