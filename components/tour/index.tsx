import React, { useContext, useEffect, useState } from 'react';
import RCTour from '@rc-component/tour';
import type { TourProps as RcTourProps } from '@rc-component/tour';
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
    actionsRender,
    steps,
    closeIcon,
    current,
    ...restProps
  } = props;
  const { getPrefixCls, direction, tour } = useContext<ConfigConsumerProps>(ConfigContext);
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const [, token] = useToken();

  const mergedSteps = React.useMemo<TourProps['steps']>(
    () =>
      steps?.map((step) => ({
        ...step,
        className: classNames(step.className, {
          [`${prefixCls}-primary`]: (step.type ?? type) === 'primary',
        }),
      })),
    [steps, type],
  );

  const builtinPlacements: TourProps['builtinPlacements'] = (config) =>
    getPlacements({
      arrowPointAtCenter: config?.arrowPointAtCenter ?? true,
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
    cssVarCls,
    rootClassName,
  );

  const [arrows, setArrows] = useState<Array<boolean | { pointAtCenter: boolean } | undefined>>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Sync currentStep with the current prop from RCTour
  React.useEffect(() => {
    if (current !== undefined) {
      setCurrentStep(current);
    }
  }, [current]);

  useEffect(() => {
    const arrowItems = [];
    for (const item of steps ?? []) {
      if (item.contentRender) {
        if (typeof item.arrow === 'object' && item.arrow.pointAtCenter) {
          arrowItems.push(item.arrow);
        } else {
          arrowItems.push(false);
        }
      } else {
        arrowItems.push(item.arrow);
      }
    }
    setArrows(arrowItems);
  }, [steps]);

  const mergedRenderPanel: RcTourProps['renderPanel'] = (stepProps, stepCurrent) => {
    return (stepProps as TourStepProps).contentRender ? (
      (stepProps as TourStepProps).contentRender
    ) : (
      <TourPanel
        type={type}
        stepProps={stepProps}
        current={stepCurrent}
        indicatorsRender={indicatorsRender}
        actionsRender={actionsRender}
      />
    );
  };

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tour', restProps.zIndex);

  return wrapCSSVar(
    <zIndexContext.Provider value={contextZIndex}>
      <RCTour
        {...restProps}
        current={current}
        closeIcon={closeIcon ?? tour?.closeIcon}
        arrow={arrows[currentStep]}
        zIndex={zIndex}
        rootClassName={customClassName}
        prefixCls={prefixCls}
        animated
        renderPanel={mergedRenderPanel}
        builtinPlacements={builtinPlacements}
        steps={mergedSteps as RcTourProps['steps']}
      />
    </zIndexContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
