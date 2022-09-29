import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import RCTour from '../../../tour/src/index';
import type { CompoundedComponent, TourProps } from './interface';
import TourGroupContext from './context';

export const tourPrefixCls = 'tooltip';

const Tour: React.ForwardRefRenderFunction<HTMLAnchorElement | HTMLButtonElement, TourProps> = (
  props,
  ref,
) => {
  const { prefixCls: customizePrefixCls, className, steps, description, ...restProps } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls(tourPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    prefixCls,
    className,
    hashId,
  );

  const currentTarget = steps[0].getTarget;

  return wrapSSR(
    <RCTour
      prefixCls={prefixCls}
      overlayClassName={customClassName}
      getTooltipContainer={currentTarget}
      overlay={<span>popuppopuppopup</span>}
      popupVisible
      placement={'leftBottom'}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

const ForwardTour = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TourProps>(
  Tour,
) as CompoundedComponent;

export default ForwardTour;
