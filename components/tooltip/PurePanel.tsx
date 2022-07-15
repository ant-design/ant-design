import * as React from 'react';
import { Popup } from 'rc-tooltip';
import classNames from 'classnames';
import type { TooltipProps } from '.';
import { ConfigContext } from '../config-provider';

import useStyle from './style';

export interface PurePanelProps extends Omit<TooltipProps, 'children'> {}

// ant-tooltip css-dev-only-do-not-override-w2s56n ant-tooltip-placement-top  ant-tooltip-hidden

export default function PurePanel(props: PurePanelProps) {
  const { prefixCls: customizePrefixCls, className, placement = 'top', title } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls, true);

  return wrapSSR(
    <div
      className={classNames(
        hashId,
        prefixCls,
        `${prefixCls}-pure`,
        `${prefixCls}-placement-${placement}`,
        className,
      )}
    >
      <Popup {...props} className={hashId} prefixCls={prefixCls}>
        {title}
      </Popup>
    </div>,
  );
}
