import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import React, { useContext, useLayoutEffect } from 'react';
import useMergedType from '../_util/hooks/useMergedType';
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
    current,
    defaultCurrent = 0,
    type,
    rootClassName,
    indicatorsRender,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { token } = theme.useToken();

  const [innerCurrent, setInnerCurrent] = useMergedState<number>(defaultCurrent, {
    value: current,
  });

  useLayoutEffect(() => {
    if (typeof current === 'undefined') return;
    setInnerCurrent(current);
  }, [current]);

  const currentMergedType = useMergedType(props, 'steps', innerCurrent);

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
    setInnerCurrent(stepCurrent);
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
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
