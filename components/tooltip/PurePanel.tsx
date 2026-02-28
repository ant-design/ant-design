import * as React from 'react';
import { Popup } from '@rc-component/tooltip';
import { clsx } from 'clsx';

import type { TooltipClassNamesType, TooltipProps, TooltipStylesType } from '.';
import { useMergeSemantic } from '../_util/hooks';
import { ConfigContext } from '../config-provider';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
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
    classNames,
    styles,
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('tooltip', customizePrefixCls);

  const rootPrefixCls = getPrefixCls();

  const rootCls = useCSSVarCls(prefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  // Color
  const colorInfo = parseColor(rootPrefixCls, prefixCls, color);

  const arrowContentStyle: React.CSSProperties = colorInfo.arrowStyle;

  const innerStyles = React.useMemo(() => {
    const mergedStyle: React.CSSProperties = {
      ...overlayInnerStyle,
      ...colorInfo.overlayStyle,
    };
    return { container: mergedStyle };
  }, [overlayInnerStyle, colorInfo.overlayStyle]);

  const mergedProps: TooltipProps = {
    ...props,
    placement,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    TooltipClassNamesType,
    TooltipStylesType,
    TooltipProps
  >([classNames], [innerStyles, styles], {
    props: mergedProps,
  });

  const rootClassName = clsx(
    rootCls,
    hashId,
    cssVarCls,
    prefixCls,
    `${prefixCls}-pure`,
    `${prefixCls}-placement-${placement}`,
    className,
    colorInfo.className,
  );

  return (
    <div className={rootClassName} style={arrowContentStyle}>
      <div className={`${prefixCls}-arrow`} />
      <Popup
        {...props}
        className={hashId}
        prefixCls={prefixCls}
        classNames={mergedClassNames}
        styles={mergedStyles}
      >
        {title}
      </Popup>
    </div>
  );
};

export default PurePanel;
