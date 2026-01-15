import * as React from 'react';
import StarFilled from '@ant-design/icons/StarFilled';
import RcRate from '@rc-component/rate';
import type { RateRef, RateProps as RcRateProps } from '@rc-component/rate/lib/Rate';
import type { StarProps as RcStarProps } from '@rc-component/rate/lib/Star';
import { clsx } from 'clsx';

import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import Tooltip from '../tooltip';
import type { TooltipProps } from '../tooltip';
import useStyle from './style';

const isTooltipProps = (item: TooltipProps | string): item is TooltipProps => {
  return typeof item === 'object' && item !== null;
};

export interface RateProps extends RcRateProps {
  rootClassName?: string;
  tooltips?: (TooltipProps | string)[];
  size?: 'small' | 'middle' | 'large';
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
    size = 'middle',
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

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
  } = useComponentConfig('rate');

  const ratePrefixCls = getPrefixCls('rate', prefixCls);

  // Style
  const [hashId, cssVarCls] = useStyle(ratePrefixCls);

  const mergedStyle: React.CSSProperties = { ...contextStyle, ...style };

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  return (
    <RcRate
      ref={ref}
      character={character}
      characterRender={characterRender}
      disabled={mergedDisabled}
      {...rest}
      className={clsx(
        `${ratePrefixCls}-${size}`,
        className,
        rootClassName,
        hashId,
        cssVarCls,
        contextClassName,
      )}
      style={mergedStyle}
      prefixCls={ratePrefixCls}
      direction={direction}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}

export default Rate;
