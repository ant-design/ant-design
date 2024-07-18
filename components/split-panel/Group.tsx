import type { ReactNode } from 'react';
import React from 'react';
import classNames from 'classnames';

import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useStyle from './style';

export interface GroupProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  style?: React.CSSProperties;
  layout?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
}

const Group: React.FC<GroupProps> = (props) => {
  const { prefixCls: customizePrefixCls, className, layout = 'horizontal', children } = props;
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
  React.Children.forEach(children, (child, idx) => {
    if (React.isValidElement(child)) {
      childrenNode.push(child);
    }

    if (idx % 2 === 0) {
      childrenNode.push(<div className={`${prefixCls}-bar`} />);
    }
  });

  return wrapCSSVar(<div className={groupClassName}>{childrenNode}</div>);
};

export default Group;
