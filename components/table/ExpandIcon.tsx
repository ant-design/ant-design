import * as React from 'react';
import { clsx } from 'clsx';

import type { AnyObject } from '../_util/type';
import type { TableLocale } from './interface';

interface DefaultExpandIconProps<RecordType = AnyObject> {
  prefixCls: string;
  record: RecordType;
  expanded: boolean;
  expandable: boolean;
  onExpand: (record: RecordType, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface RenderExpandIconOptions {
  expandIcon?: React.ReactNode;
  expandIconExpanded?: React.ReactNode;
}

function renderExpandIcon(locale: TableLocale, options?: RenderExpandIconOptions) {
  const { expandIcon, expandIconExpanded } = options || {};
  
  return <RecordType extends AnyObject = AnyObject>(props: DefaultExpandIconProps<RecordType>) => {
    const { prefixCls, onExpand, record, expanded, expandable } = props;
    const iconPrefix = ${prefixCls}-row-expand-icon;
    
    // Use custom icon if provided
    const customIcon = expanded ? expandIconExpanded : expandIcon;
    
    return (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={clsx(iconPrefix, {
          [${iconPrefix}-spaced]: !expandable,
          [${iconPrefix}-expanded]: expandable && expanded,
          [${iconPrefix}-collapsed]: expandable && !expanded,
        })}
        aria-label={expanded ? locale.collapse : locale.expand}
        aria-expanded={expanded}
      >
        {customIcon}
      </button>
    );
  };
}

export default renderExpandIcon;