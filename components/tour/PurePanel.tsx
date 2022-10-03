import * as React from 'react';
import { Popup } from 'rc-tour';
import classNames from 'classnames';
import type { TourProps } from '.';
import { ConfigContext } from '../config-provider';

import useStyle from './style';
import { parseColor } from './util';

export interface PurePanelProps extends Omit<TourProps, 'children'> {}

// ant-tour css-dev-only-do-not-override-w2s56n ant-tour-placement-top  ant-tour-hidden

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

  const prefixCls = getPrefixCls('tour', customizePrefixCls);
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
