import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { GroupProps } from './Group';
import Group from './Group';
import useStyle from './style';

type SplitPanelType = React.FC<SplitPanelTypeProps> & {
  Group: React.FC<GroupProps>;
};

export interface SplitPanelTypeProps {
  /** Customize prefix class name */
  prefixCls?: string;
  /** Additional class name of Spin */
  className?: string;
  /** Additional root class name of Spin */
  rootClassName?: string;
  /** Style of Spin */
  style?: React.CSSProperties;
  /** Specifies a delay in milliseconds for loading state (prevent flush) */
  delay?: number;
  /** The className of wrapper when Spin has children */
  wrapperClassName?: string;
  /** Children of Spin */
  children?: React.ReactNode;
  /** Display a backdrop with the `Spin` component */
  fullscreen?: boolean;
}

const SplitPanel: SplitPanelType = (props) => {
  const { prefixCls: customizePrefixCls, className, children } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('split-panel', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const splitClassName = classNames(prefixCls, className, cssVarCls, rootCls, hashId);

  return wrapCSSVar(<div className={splitClassName}>{children}</div>);
};

SplitPanel.Group = Group;

export default SplitPanel;
