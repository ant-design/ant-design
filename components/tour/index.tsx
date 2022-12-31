import React, { useContext } from 'react';
import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import panelRender from './panelRender';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { TourProps, TourStepProps } from './interface';
import PurePanel from './PurePanel';

const Tour: React.FC<TourProps> & { _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel } = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    steps,
    current,
    type,
    rootClassName,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    rootClassName,
  );

  const mergedRenderPanel = (stepProps: TourStepProps, stepCurrent: number) =>
    panelRender(stepProps, stepCurrent, type);

  return wrapSSR(
    <RCTour
      {...restProps}
      rootClassName={customClassName}
      prefixCls={prefixCls}
      steps={steps}
      current={current}
      animated
      renderPanel={mergedRenderPanel}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
