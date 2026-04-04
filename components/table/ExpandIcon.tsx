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
  /** Custom expand icon from ComponentToken */
  icon?: React.ReactNode;
}

function renderExpandIcon(locale: TableLocale, customIcon?: React.ReactNode) {
  return <RecordType extends AnyObject = AnyObject>(props: DefaultExpandIconProps<RecordType>) => {
    const { prefixCls, onExpand, record, expanded, expandable, icon } = props;
    const resolvedIcon = icon ?? customIcon;
    const iconPrefix = `${prefixCls}-row-expand-icon`;
    
    // If custom icon is provided via ComponentToken, render it with wrapper
    if (resolvedIcon) {
      const iconClassName = clsx(iconPrefix, {
        [`${iconPrefix}-spaced`]: !expandable,
        [`${iconPrefix}-expanded`]: expandable && expanded,
        [`${iconPrefix}-collapsed`]: expandable && !expanded,
      });

      const iconContent = typeof resolvedIcon === 'function'
        ? resolvedIcon({ expanded, expandable })
        : resolvedIcon;

      return (
        <span
          role="button"
          onClick={(e) => {
            if (expandable) {
              onExpand(record, e!);
            }
            e!.stopPropagation();
          }}
          className={iconClassName}
          aria-label={expanded ? locale.collapse : locale.expand}
          aria-expanded={expanded}
        >
          {iconContent}
        </span>
      );
    }
    
    return (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className={clsx(iconPrefix, {
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
