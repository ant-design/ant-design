import classNames from 'classnames';
import { Popup } from 'rc-tooltip';
import * as React from 'react';
import type { TooltipProps } from '.';
import { ConfigContext } from '../config-provider';

import useStyle from './style';
import { parseColor } from './util';

export interface PurePanelProps extends Omit<TooltipProps, 'children'> {}

// ant-tooltip css-dev-only-do-not-override-w2s56n ant-tooltip-placement-top  ant-tooltip-hidden

export default function PurePanel(props: PurePanelProps) {
  const {
    prefixCls: customizePrefixCls,
    className,
    placement = 'top',
    title,
    color,
    overlayInnerStyle,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls, true);

  // Color
  const colorInfo = parseColor(prefixCls, color);
  const formattedOverlayInnerStyle = { ...overlayInnerStyle, ...colorInfo.overlayStyle };
  const arrowContentStyle = colorInfo.arrowStyle;

  return wrapSSR(
    <div
      className={classNames(
        hashId,
        prefixCls,
        `${prefixCls}-pure`,
        `${prefixCls}-placement-${placement}`,
        className,
        colorInfo.className,
      )}
      style={arrowContentStyle}
    >
      <div className={`${prefixCls}-arrow`} />
      <Popup
        {...props}
        className={hashId}
        prefixCls={prefixCls}
        overlayInnerStyle={formattedOverlayInnerStyle}
      >
        {title}
      </Popup>
    </div>,
  );
}
