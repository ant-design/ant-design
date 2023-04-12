import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import React, { useContext, useMemo, useLayoutEffect, useState } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import theme from '../theme';
import getPlacements from '../_util/placements';
import type { TourProps, TourStepProps } from './interface';
import TourPanel from './panelRender';
import PurePanel from './PurePanel';
import useStyle from './style';

const Tour: React.FC<TourProps> & { _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel } = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    steps = [],
    current,
    type,
    rootClassName,
    indicatorsRender,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { token } = theme.useToken();

  const [currentStep, setCurrentStep] = useState<TourStepProps | null>(
    current ? steps[current] : null,
  );

  useLayoutEffect(() => {
    if(typeof current === 'undefined') return;
    setCurrentStep(steps[current]);
  }, [current]);

  const currentMergedType = useMemo<TourProps['type']>(() => {
    const { type: stepType } = currentStep || {};
    return typeof stepType !== 'undefined' ? stepType : type;
  }, [currentStep]);

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: true,
    autoAdjustOverflow: true,
    offset: token.marginXXS,
    arrowWidth: token.sizePopupArrow,
    borderRadius: token.borderRadius,
  });

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    rootClassName,
    currentMergedType === 'primary' ? `${prefixCls}-primary` : '',
  );

  const mergedRenderPanel = (stepProps: TourStepProps, stepCurrent: number): React.ReactNode => (
    <TourPanel
      type={type}
      stepProps={stepProps}
      current={stepCurrent}
      indicatorsRender={indicatorsRender}
    />
  );

  const onStepChange = (stepCurrent: number) => {
    setCurrentStep(steps[stepCurrent]);
    props.onChange?.(stepCurrent);
  };

  return wrapSSR(
    <RCTour
      {...restProps}
      rootClassName={customClassName}
      prefixCls={prefixCls}
      steps={steps}
      current={current}
      animated
      renderPanel={mergedRenderPanel}
      builtinPlacements={builtinPlacements}
      onChange={onStepChange}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
