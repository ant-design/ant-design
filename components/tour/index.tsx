import React from 'react';
import RCTour from '@rc-component/tour';
import type { TourProps as RcTourProps } from '@rc-component/tour';
import classNames from 'classnames';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
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

  const [mergedClassNames, mergedStyles] = useMergeSemantic(
    [contextClassNames, tourClassNames],
    [contextStyles, styles],
  );

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
    mergedClassNames.root,
    className,
  );

  const semanticStyles = {
    ...mergedStyles,
    mask: {
      ...mergedStyles.root,
      ...mergedStyles.mask,
      ...contextStyle,
      ...style,
    },
  };

  const mergedRenderPanel: RcTourProps['renderPanel'] = (stepProps, stepCurrent) => (
    <TourPanel
      styles={semanticStyles}
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
        styles={semanticStyles}
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
