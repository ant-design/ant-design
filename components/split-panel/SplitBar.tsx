import type { ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';

export interface GroupContext {
  defaultSize: number;
}

export const GroupContext = React.createContext<GroupContext>({ defaultSize: 50 });

export interface GroupProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  layout?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
  height?: number;
  splitBarSize?: number;
}

const Group: React.FC<GroupProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    layout = 'horizontal',
    children,
    height,
    splitBarSize = 4,
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('split-panel-group', customizePrefixCls);
  const rootCls = useCSSVarCls(prefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const groupClassName = classNames(
    prefixCls,
    className,
    {
      [`${prefixCls}-horizontal`]: layout === 'horizontal',
      [`${prefixCls}-vertical`]: layout === 'vertical',
    },
    cssVarCls,
    rootCls,
    hashId,
  );

  const childrenNode: ReactNode[] = [];
  const panelCount = React.Children.count(children);
  React.Children.forEach(children, (child, idx) => {
    if (React.isValidElement(child)) {
      childrenNode.push(child);
    }

    if (idx + 1 < panelCount) {
      childrenNode.push(<div className={`${prefixCls}-bar`} style={{ flexBasis: splitBarSize }} />);
    }
  });

  return wrapCSSVar(
    <GroupContext.Provider value={{ defaultSize: 100 / panelCount }}>
      <div className={groupClassName} style={{ height }}>
        {childrenNode}
      </div>
    </GroupContext.Provider>,
  );
};

export default Group;
