import React, { useContext } from 'react';
import RCTour from '@rc-component/tour';
import type { TourProps as RcTourProps } from '@rc-component/tour';
import classNames from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import getPlacements from '../_util/placements';
import zIndexContext from '../_util/zindexContext';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import { useToken } from '../theme/internal';
import type { TourProps } from './interface';
import TourPanel from './panelRender';
import PurePanel from './PurePanel';
import useStyle from './style';
import TourContext from './TourContext';

const Tour: React.FC<TourProps> & { _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel } = (
  props,
) => {
  const {
    prefixCls: customizePrefixCls,
    type,
    rootClassName,
    indicatorsRender,
    steps,
    closeIcon,
    classNames: tourClassNames,
    styles,
    className,
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
    tour?.className,
    tour?.classNames?.root,
    tourClassNames?.root,
    className,
  );

  const RCTourClassNames = {
    mask: classNames(tour?.classNames?.mask, tourClassNames?.mask),
    actions: classNames(tour?.classNames?.actions, tourClassNames?.actions),
    description: classNames(tour?.classNames?.description, tourClassNames?.description),
    header: classNames(tour?.classNames?.header, tourClassNames?.header),
    title: classNames(tour?.classNames?.title, tourClassNames?.title),
    content: classNames(tour?.classNames?.content, tourClassNames?.content),
    body: classNames(tour?.classNames?.body, tourClassNames?.body),
    footer: classNames(tour?.classNames?.footer, tourClassNames?.footer),
  };

  const RCTourStyles = {
    mask: { ...tour?.styles?.mask, ...styles?.mask },
    actions: { ...tour?.styles?.actions, ...styles?.actions },
    description: { ...tour?.styles?.description, ...styles?.description },
    header: { ...tour?.styles?.header, ...styles?.header },
    title: { ...tour?.styles?.title, ...styles?.title },
    content: { ...tour?.styles?.content, ...styles?.content },
    body: { ...tour?.styles?.body, ...styles?.body },
    footer: { ...tour?.styles?.footer, ...styles?.footer },
  };

  const mergedClassNames = {
    ...RCTourClassNames,
    indicator: classNames(tour?.classNames?.indicator, tourClassNames?.indicator),
    cover: classNames(tour?.classNames?.cover, tourClassNames?.cover),
  };

  const mergedStyles = {
    ...RCTourStyles,
    indicator: { ...tour?.styles?.indicator, ...styles?.indicator },
    cover: { ...tour?.styles?.cover, ...styles?.cover },
  };

  const mergedRenderPanel: RcTourProps['renderPanel'] = (stepProps, stepCurrent) => (
    <TourPanel
      styles={mergedStyles}
      classNames={mergedClassNames}
      type={type}
      stepProps={stepProps}
      current={stepCurrent}
      indicatorsRender={indicatorsRender}
    />
  );

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tour', restProps.zIndex);

  return wrapCSSVar(
    <TourContext.Provider value={{ styles: mergedStyles, classNames: mergedClassNames }}>
      <zIndexContext.Provider value={contextZIndex}>
        <RCTour
          {...restProps}
          // styles={RCTourStyles}
          // classNames={RCTourClassNames}
          closeIcon={closeIcon ?? tour?.closeIcon}
          zIndex={zIndex}
          rootClassName={customClassName}
          prefixCls={prefixCls}
          animated
          renderPanel={mergedRenderPanel}
          builtinPlacements={builtinPlacements}
          steps={mergedSteps}
        />
      </zIndexContext.Provider>
    </TourContext.Provider>,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
