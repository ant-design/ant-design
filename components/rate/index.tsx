import * as React from 'react';
import StarFilled from '@ant-design/icons/StarFilled';
import classNames from 'classnames';
import RcRate from 'rc-rate';
import type { RateRef, RateProps as RcRateProps } from 'rc-rate/lib/Rate';
import type { StarProps as RcStarProps } from 'rc-rate/lib/Star';

import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import Tooltip, { TooltipProps } from '../tooltip';
import useStyle from './style';

const isTooltipProps = (item: TooltipProps | string): item is TooltipProps => {
  return typeof item === 'object' && item !== null;
};

export interface RateProps extends RcRateProps {
  rootClassName?: string;
  tooltips?: (TooltipProps | string)[];
}

const Rate = React.forwardRef<RateRef, RateProps>((props, ref) => {
  const {
    prefixCls,
    className,
    rootClassName,
    style,
    tooltips,
    character = <StarFilled />,
    disabled: customDisabled,
    ...rest
  } = props;

  const characterRender: RcStarProps['characterRender'] = (node, { index }) => {
    if (!tooltips) {
      return node;
    }

    const tooltipsItem = tooltips[index as number];

    if (isTooltipProps(tooltipsItem)) {
      return <Tooltip {...tooltipsItem}>{node}</Tooltip>;
    }

    return <Tooltip title={tooltipsItem as string}>{node}</Tooltip>;
  };

  const { getPrefixCls, direction, rate } = React.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls('rate', prefixCls);

  // Style
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(ratePrefixCls);

  const mergedStyle: React.CSSProperties = { ...rate?.style, ...style };

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  return wrapCSSVar(
    <RcRate
      ref={ref}
      character={character}
      characterRender={characterRender}
      disabled={mergedDisabled}
      {...rest}
      className={classNames(className, rootClassName, hashId, cssVarCls, rate?.className)}
      style={mergedStyle}
      prefixCls={ratePrefixCls}
      direction={direction}
    />,
  );
});

if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}

export default Rate;
