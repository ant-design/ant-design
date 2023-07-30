import classNames from 'classnames';
import { Popup } from 'rc-tooltip';
import * as React from 'react';
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
  const [wrapSSR, hashId] = useStyle(prefixCls, true);

  // Color
  const colorInfo = parseColor(prefixCls, color);

  const arrowContentStyle = colorInfo.arrowStyle;

  const formattedOverlayInnerStyle: React.CSSProperties = {
    ...overlayInnerStyle,
    ...colorInfo.overlayStyle,
  };

  const cls = classNames(
    hashId,
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
    colorInfo.className,
  );

  return wrapSSR(
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
    </div>,
  );
};

export default PurePanel;
