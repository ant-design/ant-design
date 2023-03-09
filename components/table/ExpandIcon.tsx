import classNames from 'classnames';
import * as React from 'react';
import type { TableLocale } from './interface';

interface DefaultExpandIconProps<RecordType> {
  prefixCls: string;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLElement>) => void;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
}

function renderExpandIcon(locale: TableLocale) {
  return function expandIcon<RecordType>({
    prefixCls,
    onExpand,
    record,
    expanded,
    expandable,
  }: DefaultExpandIconProps<RecordType>) {
    const iconPrefix = `${prefixCls}-row-expand-icon`;

    return (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={classNames(iconPrefix, {
          [`${iconPrefix}-spaced`]: !expandable,
          [`${iconPrefix}-expanded`]: expandable && expanded,
          [`${iconPrefix}-collapsed`]: expandable && !expanded,
        })}
        aria-label={expanded ? locale.collapse : locale.expand}
        aria-expanded={expanded}
      />
    );
  };
}

export default renderExpandIcon;
