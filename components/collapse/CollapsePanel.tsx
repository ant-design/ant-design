import * as React from 'react';
import classNames from 'classnames';
import RcCollapse from 'rc-collapse';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';

export type CollapsibleType = 'header' | 'icon' | 'disabled';

export interface CollapsePanelProps {
  key: string | number;
  header: React.ReactNode;
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
  extra?: React.ReactNode;
  collapsible?: CollapsibleType;
  children?: React.ReactNode;
}

const CollapsePanel = React.forwardRef<HTMLDivElement, CollapsePanelProps>((props, ref) => {
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Collapse.Panel');

    warning.deprecated(!('disabled' in props), 'disabled', 'collapsible="disabled"');
  }

  const { getPrefixCls } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className, showArrow = true } = props;
  const prefixCls = getPrefixCls('collapse', customizePrefixCls);
  const collapsePanelClassName = classNames(
    {
      [`${prefixCls}-no-arrow`]: !showArrow,
    },
    className,
  );
  return (
    <RcCollapse.Panel
      ref={ref}
      {...props}
      prefixCls={prefixCls}
      className={collapsePanelClassName}
    />
  );
});

export default CollapsePanel;
