import * as React from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import type { TourStepProps } from './interface';
import panelRender from './panelRender';
import { RawPurePanel as PopoverRawPurePanel } from '../popover/PurePanel';
import useStyle from './style';

export interface PurePanelProps extends TourStepProps {}

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    current = 0,
    total = 6,
    className,
    style,
    type,
    ...restProps
  } = props;

  const { getPrefixCls } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const node = panelRender(
    {
      ...restProps,
      prefixCls,
      total,
    },
    current,
    type,
  );

  return wrapSSR(
    <PopoverRawPurePanel
      prefixCls={prefixCls}
      hashId={hashId}
      className={classNames(className, `${prefixCls}-pure`, `${prefixCls}-${type}`)}
      style={style}
    >
      {node}
    </PopoverRawPurePanel>,
  );

  // return node as React.ReactElement;
}
