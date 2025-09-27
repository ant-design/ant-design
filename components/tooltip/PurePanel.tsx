import * as React from 'react';
import { Popup } from '@rc-component/tooltip';
import { clsx } from 'clsx';

import type { TooltipProps } from '.';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import { parseColor } from './util';

export interface PurePanelProps extends Omit<TooltipProps, 'children'> {}

/** @private Internal Component. Do not use in your production. */
const PurePanel: React.FC<PurePanelProps> = (props) => {
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
  const [hashId, cssVarCls] = useStyle(prefixCls);

  // Color
  const colorInfo = parseColor(prefixCls, color);

  const arrowContentStyle = colorInfo.arrowStyle;

  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const cls = clsx(
    hashId,
    cssVarCls,
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
    colorInfo.className,
  );

  return (
    <div className={cls} style={arrowContentStyle}>
      <div className={`${prefixCls}-arrow`} />
      <Popup
        {...props}
        className={hashId}
        prefixCls={prefixCls}
        overlayInnerStyle={formattedOverlayInnerStyle}
      >
        {title}
      </Popup>
    </div>
  );
};

export default PurePanel;
