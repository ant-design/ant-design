import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import React, { useContext } from 'react';
import getPlacements from '../_util/placements';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import theme from '../theme';
import PurePanel from './PurePanel';
import type { TourProps, TourStepProps } from './interface';
import TourPanel from './panelRender';
import useStyle from './style';
import useMergedType from './useMergedType';

const Tour: React.FC<TourProps> & { _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel } = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    current,
    defaultCurrent,
    type,
    rootClassName,
    indicatorsRender,
    steps,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { token } = theme.useToken();

  const { currentMergedType, updateInnerCurrent } = useMergedType({
    defaultType: type,
    steps,
    current,
    defaultCurrent,
  });

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: true,
    autoAdjustOverflow: true,
    offset: token.marginXXS,
    arrowWidth: token.sizePopupArrow,
    borderRadius: token.borderRadius,
  });

  const customClassName = classNames(
    {
      [`${prefixCls}-primary`]: currentMergedType === 'primary',
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    hashId,
    rootClassName,
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
    updateInnerCurrent(stepCurrent);
    props.onChange?.(stepCurrent);
  };

  return wrapSSR(
    <RCTour
      {...restProps}
      rootClassName={customClassName}
      prefixCls={prefixCls}
      current={current}
      defaultCurrent={defaultCurrent}
      animated
      renderPanel={mergedRenderPanel}
      builtinPlacements={builtinPlacements}
      onChange={onStepChange}
      steps={steps}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
