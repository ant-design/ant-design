import classNames from 'classnames';
import React, { useContext, useMemo } from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import Trigger from 'rc-trigger';
import Popover from '../popover';
import useStyle from './style';
// import Tooltip from '../tooltip';
// import Content from './TourContent';
import type {
  CompoundedComponent,
  TourProps,
  // TourShape,
} from './interface';
// import Group from './TourGroup';
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
    type = 'default',
    shape = 'circle',
    icon,
    description,
    tooltip,
    steps,
    ...restProps
  } = props;
  console.log('props', props);
  const { getPrefixCls, direction } = useContext<ConfigConsumerProps>(ConfigContext);
  const groupShape = useContext(TourGroupContext);
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

  const contentProps = useMemo(
    () => ({ prefixCls, description, icon, type }),
    [prefixCls, description, icon, type],
  );

  if (process.env.NODE_ENV !== 'production') {
    warning(
      !(shape === 'circle' && description),
      'Tour',
      'supported only when `shape` is `square`. Due to narrow space for text, short sentence is recommended.',
    );
  }
  const builtinPlacements = {
    left: {
      points: ['cr', 'cl'],
    },
    right: {
      points: ['cl', 'cr'],
    },
    top: {
      points: ['bc', 'tc'],
    },
    bottom: {
      points: ['tc', 'bc'],
    },
    topLeft: {
      points: ['bl', 'tl'],
    },
    topRight: {
      points: ['br', 'tr'],
    },
    bottomRight: {
      points: ['tr', 'br'],
    },
    bottomLeft: {
      points: ['tl', 'bl'],
    },
  };

  const dom = steps.map(item => {
    return (
      <Trigger
        getPopupContainer={item.getTarget}
        // popupAlign={getPopupAlign(state)}
        popupPlacement={{
          left: {
            points: ['cr', 'cl'],
          },
        }}
        // destroyPopupOnHide={this.state.destroyPopupOnHide}
        // zIndex={40}
        mask={false}
        maskClosable={false}
        stretch={''}
        // maskAnimation="fade"
        // mouseEnterDelay={0.1}
        // mouseLeaveDelay={0.1}
        action={['hover']}
        builtinPlacements={builtinPlacements}
        popupStyle={{
          border: '1px solid red',
          padding: 10,
          background: 'white',
          boxSizing: 'border-box',
        }}
        popup={<div>i am a popup</div>}
        // popupTransitionName={state.transitionName}
      ></Trigger>
    );
  });

  return wrapSSR(<div>{dom}</div>);
};

if (process.env.NODE_ENV !== 'production') {
  Tour.displayName = 'Tour';
}

const ForwardTour = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, TourProps>(
  Tour,
) as CompoundedComponent;

export default ForwardTour;
