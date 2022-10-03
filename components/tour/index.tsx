import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import RCTour from '@rc-component/tour/src/index';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { CompoundedComponent, TourProps } from './interface';
import Button from '../button';

export const tourPrefixCls = 'tour';

const Tour: React.ForwardRefRenderFunction<HTMLAnchorElement | HTMLButtonElement, TourProps> = (
  props,
  ref,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    steps,
    description,
    current,
    ...restProps
  } = props;
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

  const mergedSteps = steps.map(item => ({
    ...item,
    nextButtonProps: item.nextButtonProps || <Button type="primary">下一步</Button>,
    prevButtonProps: item.prevButtonProps || <Button type="primary">上一步</Button>,
    finishButtonProps: item.finishButtonProps || <Button type="primary">结束引导</Button>,
  }));

  return wrapSSR(
    <RCTour
      className={classNames(`${prefixCls}`, `${hashId}`)}
      prefixCls={prefixCls}
      steps={mergedSteps}
      current={current}
      rootClassName={hashId}
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
