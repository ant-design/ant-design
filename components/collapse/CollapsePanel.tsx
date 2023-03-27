import classNames from 'classnames';
import RcCollapse from 'rc-collapse';
import * as React from 'react';
import type { CollapsePanelProps as RCcollapsePanelProps } from 'rc-collapse';
import { ConfigContext } from '../config-provider';
import warning from '../_util/warning';

export type CollapsePanelProps = RCcollapsePanelProps & {
  /** @deprecated Use `collapsible="disabled"` instead */
  disabled?: boolean;
};

const CollapsePanel = React.forwardRef<HTMLDivElement, CollapsePanelProps>((props, ref) => {
  warning(
    !('disabled' in props),
    'Collapse.Panel',
    '`disabled` is deprecated. Please use `collapsible="disabled"` instead.',
  );

  const { getPrefixCls } = React.useContext(ConfigContext);
  const { prefixCls: customizePrefixCls, className = '', showArrow = true } = props;
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
