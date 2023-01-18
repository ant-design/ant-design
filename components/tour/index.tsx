import React, { useContext } from 'react';
import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import type { AlignType } from 'rc-trigger/lib/interface';
import panelRender from './panelRender';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { TourProps, TourStepProps } from './interface';
import PurePanel from './PurePanel';
import theme from '../theme';
import getPlacements from '../_util/placements';

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
  const { token } = theme.useToken();

  const builtinPlacements = getPlacements({
    arrowPointAtCenter: true,
    autoAdjustOverflow: true,
    marginXXS: token.marginXXS,
    arrowWidth: token.sizePopupArrow,
  });

  // 动态设置动画点
  const onPopupAlign = (domNode: HTMLElement, align: AlignType) => {
    // 当前返回的位置
    const placement = Object.keys(builtinPlacements).find(
      (key) =>
        builtinPlacements[key].points![0] === align.points?.[0] &&
        builtinPlacements[key].points![1] === align.points?.[1],
    );

    if (placement) {
      // 根据当前坐标设置动画点
      const rect = domNode.getBoundingClientRect();

      const transformOrigin: React.CSSProperties = { top: '50%', left: '50%' };

      if (/top|Bottom/.test(placement)) {
        transformOrigin.top = `${rect.height - align.offset![1]}px`;
      } else if (/Top|bottom/.test(placement)) {
        transformOrigin.top = `${-align.offset![1]}px`;
      }
      if (/left|Right/.test(placement)) {
        transformOrigin.left = `${rect.width - align.offset![0]}px`;
      } else if (/right|Left/.test(placement)) {
        transformOrigin.left = `${-align.offset![0]}px`;
      }
      domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    }
  };

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
      builtinPlacements={builtinPlacements}
      onPopupAlign={onPopupAlign}
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
