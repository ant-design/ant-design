import React, { useContext, useMemo } from 'react';
import RCTour from '@rc-component/tour';
import classNames from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import getPlacements from '../_util/placements';
import zIndexContext from '../_util/zindexContext';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useToken } from '../theme/internal';
import type { TourProps, TourStepProps } from './interface';
import TourPanel from './panelRender';
import PurePanel from './PurePanel';
import useStyle from './style';

const Tour: React.FC<TourProps> & { _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel } = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    type,
    rootClassName,
    indicatorsRender,
    steps,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [, token] = useToken();

  const mergedSteps = useMemo(
    () =>
      steps?.map((step) => ({
        ...step,
        className: classNames(step.className, {
          [`${prefixCls}-primary`]: (step.type ?? type) === 'primary',
        }),
      })),
    [steps, type],
  );

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
  );

  const mergedRenderPanel = (stepProps: TourStepProps, stepCurrent: number): React.ReactNode => (
    <TourPanel
      type={type}
      stepProps={stepProps}
      current={stepCurrent}
      indicatorsRender={indicatorsRender}
    />
  );

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tour', restProps.zIndex);

  return wrapSSR(
    <zIndexContext.Provider value={contextZIndex}>
      <RCTour
        {...restProps}
        zIndex={zIndex}
        rootClassName={customClassName}
        prefixCls={prefixCls}
        animated
        renderPanel={mergedRenderPanel}
        builtinPlacements={builtinPlacements}
        steps={mergedSteps}
      />
    </zIndexContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
