import classNames from 'classnames';
import React, { useContext } from 'react';
import RCTour from '@rc-component/tour';
// import RCTour from '../../../tour/src/index';
import RenderPanel from './RenderPanel';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { TourProps } from './interface';

export const tourPrefixCls = 'tour';

const Tour: React.ForwardRefRenderFunction<HTMLDivElement, TourProps> = props => {
  const { prefixCls: customizePrefixCls, className, steps, current, type, ...restProps } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls(tourPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    {
      [`${prefixCls}-primary`]: type === 'primary',
    },
    hashId,
    prefixCls,
    className,
  );

  return wrapSSR(
    <RCTour
      {...restProps}
      className={customClassName}
      prefixCls={prefixCls}
      steps={steps}
      current={current}
      renderPanel={RenderPanel}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

const ForwardTour = React.forwardRef<HTMLDivElement, TourProps>(Tour);

export default ForwardTour;
