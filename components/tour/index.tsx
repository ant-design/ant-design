import React, { useContext, useMemo, useState } from 'react';
import RCTour from '@rc-component/tour';
import classNames from 'classnames';
import panelRender from './panelRender';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import type { TourProps, TourStepProps } from './interface';
import PurePanel from './PurePanel';

const Tour: React.ForwardRefRenderFunction<HTMLDivElement, TourProps> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
} = (props) => {
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

  const [curStepIndex, setCurStepIndex] = useState<TourProps['current']>(current);

  const isShowPrimaryStyle = useMemo(() => {
    if (typeof curStepIndex === 'number' && steps?.length) {
      return type === 'primary' || steps[curStepIndex].type === 'primary';
    }
    return type === 'primary';
  }, [type, curStepIndex]);

  const customClassName = classNames(
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    {
      [`${prefixCls}-primary`]: isShowPrimaryStyle,
    },
    hashId,
    rootClassName,
  );

  const mergedRenderPanel = (stepProps: TourStepProps, stepCurrent: number) => {
    setCurStepIndex(stepCurrent);
    return panelRender(stepProps, stepCurrent, stepProps.type);
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
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

Tour._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Tour;
