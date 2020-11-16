import * as React from 'react';
import RcCollapse from 'rc-collapse';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import devWarning from '../_util/devWarning';

export type CollapsibleType = boolean | 'header';

export interface CollapsePanelProps {
  key: string | number;
  header: React.ReactNode;
  /** @deprecated Use `collapsible=false` instead */
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  showArrow?: boolean;
  prefixCls?: string;
  forceRender?: boolean;
  id?: string;
  extra?: React.ReactNode;
  collapsible: CollapsibleType;
}

const CollapsePanel: React.FC<CollapsePanelProps> = props => {
  devWarning(
    !('disabled' in props),
    'Collapse.Panel',
    '`disabled` is deprecated. Please use `collapsible=false` instead.',
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
  return <RcCollapse.Panel {...props} prefixCls={prefixCls} className={collapsePanelClassName} />;
};

export default CollapsePanel;
