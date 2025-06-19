import React from 'react';
import RCTour from '@rc-component/tour';
import type { TourProps as RcTourProps } from '@rc-component/tour';
import classNames from 'classnames';

import { useZIndex } from '../_util/hooks/useZIndex';
import getPlacements from '../_util/placements';
import zIndexContext from '../_util/zindexContext';
import { useComponentConfig } from '../config-provider/context';
import { useToken } from '../theme/internal';
import type { TourProps } from './interface';
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
    classNames: tourClassNames,
    styles,
    className,
    style,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    direction,
    closeIcon: contextCloseIcon,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('tour');
  const prefixCls = getPrefixCls('tour', customizePrefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls);
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
    contextClassName,
    contextClassNames.root,
    tourClassNames?.root,
    className,
  );

  const mergedClassNames = {
    mask: classNames(contextClassNames.mask, tourClassNames?.mask),
    actions: classNames(contextClassNames.actions, tourClassNames?.actions),
    description: classNames(contextClassNames.description, tourClassNames?.description),
    header: classNames(contextClassNames.header, tourClassNames?.header),
    title: classNames(contextClassNames.title, tourClassNames?.title),
    section: classNames(contextClassNames.section, tourClassNames?.section),
    footer: classNames(contextClassNames.footer, tourClassNames?.footer),
    indicator: classNames(contextClassNames.indicator, tourClassNames?.indicator),
    indicators: classNames(contextClassNames.indicators, tourClassNames?.indicators),
    cover: classNames(contextClassNames.cover, tourClassNames?.cover),
  };

  const mergedStyles = {
    mask: {
      ...contextStyles.root,
      ...contextStyle,
      ...contextStyles?.mask,
      ...styles?.root,
      ...style,
      ...styles?.mask,
    },
    actions: { ...contextStyles.actions, ...styles?.actions },
    description: { ...contextStyles.description, ...styles?.description },
    header: { ...contextStyles.header, ...styles?.header },
    title: { ...contextStyles.title, ...styles?.title },
    section: { ...contextStyles.section, ...styles?.section },
    footer: { ...contextStyles.footer, ...styles?.footer },
    indicator: { ...contextStyles.indicator, ...styles?.indicator },
    indicators: { ...contextStyles.indicators, ...styles?.indicators },
    cover: { ...contextStyles.cover, ...styles?.cover },
  };

  const mergedRenderPanel: RcTourProps['renderPanel'] = (stepProps, stepCurrent) => (
    <TourPanel
      styles={mergedStyles}
      classNames={mergedClassNames}
      type={type}
      stepProps={stepProps}
      current={stepCurrent}
      indicatorsRender={indicatorsRender}
      actionsRender={actionsRender}
    />
  );

  // ============================ zIndex ============================
  const [zIndex, contextZIndex] = useZIndex('Tour', restProps.zIndex);

  return (
    <zIndexContext.Provider value={contextZIndex}>
      <RCTour
        {...restProps}
        styles={mergedStyles}
        classNames={mergedClassNames}
        closeIcon={closeIcon ?? contextCloseIcon}
        zIndex={zIndex}
        rootClassName={customClassName}
        prefixCls={prefixCls}
        animated
        renderPanel={mergedRenderPanel}
        builtinPlacements={builtinPlacements}
        steps={mergedSteps}
      />
    </zIndexContext.Provider>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
