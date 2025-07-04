import * as React from 'react';
import classNames from 'classnames';

import type { AnyObject } from '../_util/type';
import type { TableLocale } from './interface';

interface DefaultExpandIconProps<RecordType = AnyObject> {
  prefixCls: string;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function renderExpandIcon(locale: TableLocale) {
  return <RecordType extends AnyObject = AnyObject>(props: DefaultExpandIconProps<RecordType>) => {
    const { prefixCls, onExpand, record, expanded, expandable } = props;
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
