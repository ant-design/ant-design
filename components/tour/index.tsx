import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import Trigger from 'rc-trigger';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style';
import TourRc from '../tour-rc';
import type { CompoundedComponent, TourProps, TourShape } from './interface';
import TourGroupContext from './context';
import warning from '../_util/warning';

export const floatButtonPrefixCls = 'float-btn';

const Tour: React.ForwardRefRenderFunction<HTMLAnchorElement | HTMLButtonElement, TourProps> = (
  props,
  ref,
) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    type = 'default', // TODO  删除
    shape = 'circle', // TODO  删除
    steps,
    description,
    ...restProps
  } = props;
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext<TourShape | null>(TourGroupContext);
  const prefixCls = getPrefixCls(floatButtonPrefixCls, customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const mergeShape = groupShape || shape;

  const classString = classNames(
    hashId,
    prefixCls,
    className,
    `${prefixCls}-${type}`,
    `${prefixCls}-${mergeShape}`,
    {
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
  );

  // const contentProps = useMemo<TourContentProps>(
  //   () => ({ prefixCls, description, icon, type }),
  //   [prefixCls, description, icon, type],
  // );
  const currentTarget = steps[0].getTarget;

  return wrapSSR(
    <TourRc
      // className={classString}
      // ref={ref as React.LegacyRef<HTMLButtonElement>}
      // {...props}
      getPopupContainer={currentTarget}
      popup={<span>popuppopuppopup</span>}
      popupVisible
    />,
  );
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

const ForwardTour = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TourProps>(
  Tour,
) as CompoundedComponent;

export default ForwardTour;
