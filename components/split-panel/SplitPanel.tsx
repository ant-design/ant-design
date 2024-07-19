import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import type { GroupProps } from './Group';
import Group, { GroupContext } from './Group';
import useStyle from './style';

type SplitPanelType = React.FC<SplitPanelProps> & {
  Group: React.FC<GroupProps>;
};

export interface SplitPanelProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  defaultSize?: number;
}

const SplitPanel: SplitPanelType = (props) => {
  const { defaultSize: groupDefaultSize,  } = React.useContext(GroupContext);

  const {
    prefixCls: customizePrefixCls,
    className,
    children,
    defaultSize = groupDefaultSize,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('split-panel', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const splitClassName = classNames(prefixCls, className, cssVarCls, rootCls, hashId);

  return wrapCSSVar(
    <div
      className={splitClassName}
      style={{
        flexBasis: `${defaultSize}%`,
      }}
    >
      {children}
    </div>,
  );
};

SplitPanel.Group = Group;

export default SplitPanel;
