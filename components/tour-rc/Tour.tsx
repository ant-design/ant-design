import * as React from 'react';
import { useRef, useImperativeHandle, forwardRef } from 'react';
import Trigger from 'rc-trigger';
import type { TriggerProps } from 'rc-trigger';
import type { AlignType, AnimationType, ActionType } from 'rc-trigger/lib/interface';
import { placements } from './placements';
import Popup from './Popup';

// export interface TourProps extends Pick<TriggerProps, 'onPopupAlign' | 'builtinPlacements'> {
//   trigger?: ActionType | ActionType[];
//   defaultVisible?: boolean;
//   visible?: boolean;
//   placement?: string;
//   /** @deprecated Use `motion` instead */
//   transitionName?: string;
//   /** @deprecated Use `motion` instead */
//   animation?: AnimationType;
//   /** Config popup motion */
//   motion?: TriggerProps['popupMotion'];
//   onVisibleChange?: (visible: boolean) => void;
//   afterVisibleChange?: (visible: boolean) => void;
//   overlay: (() => React.ReactNode) | React.ReactNode;
//   overlayStyle?: React.CSSProperties;
//   overlayClassName?: string;
//   prefixCls?: string;
//   mouseEnterDelay?: number;
//   mouseLeaveDelay?: number;
//   getPopupContainer?: (node: HTMLElement) => HTMLElement;
//   destroyTourOnHide?:
//     | boolean
//     | {
//         keepParent?: boolean;
//       };
//   align?: AlignType;
//   showArrow?: boolean;
//   arrowContent?: React.ReactNode;
//   id?: string;
//   children?: React.ReactElement;
//   popupVisible?: boolean;
//   overlayInnerStyle?: React.CSSProperties;
//   zIndex?: number;
// }

const Tour = (props: any, ref: any) => {
  const {
    overlayClassName,
    trigger = ['hover'],
    mouseEnterDelay = 0,
    mouseLeaveDelay = 0.1,
    overlayStyle,
    prefixCls = 'rc-tooltip',
    children,
    onVisibleChange,
    afterVisibleChange,
    transitionName,
    animation,
    motion,
    placement = 'right',
    align = {},
    destroyTourOnHide = false,
    defaultVisible,
    getPopupContainer,
    overlayInnerStyle,
    arrowContent,
    overlay,
    id,
    showArrow,
    ...restProps
  } = props;

  const domRef = useRef(null);
  useImperativeHandle(ref, () => domRef.current);

  const extraProps = { ...restProps };
  if ('visible' in props) {
    extraProps.popupVisible = props.visible;
  }

  const getPopupElement = () => (
    <Popup
      showArrow={showArrow}
      arrowContent={arrowContent}
      key="content"
      prefixCls={prefixCls}
      id={id}
      overlayInnerStyle={overlayInnerStyle}
    >
      <span>popuppopuppopup</span>
      {overlay}
    </Popup>
  );

  let destroyTour = false;
  let autoDestroy = false;
  if (typeof destroyTourOnHide === 'boolean') {
    destroyTour = destroyTourOnHide;
  } else if (destroyTourOnHide && typeof destroyTourOnHide === 'object') {
    const { keepParent } = destroyTourOnHide;
    destroyTour = keepParent === true;
    autoDestroy = keepParent === false;
  }

  return (
    <Trigger
      // popupClassName={overlayClassName}
      // prefixCls={prefixCls}
      // popup={getPopupElement}
      // action={trigger}
      builtinPlacements={placements}
      popupPlacement={placement} // 位置不对
      // ref={domRef}
      // popupAlign={align}
      // getPopupContainer={getPopupContainer}
      onPopupVisibleChange={onVisibleChange}
      afterPopupVisibleChange={afterVisibleChange}
      popupTransitionName={transitionName}
      popupAnimation={animation}
      popupMotion={motion}
      defaultPopupVisible={defaultVisible}
      destroyPopupOnHide={destroyTour}
      autoDestroy={autoDestroy}
      mouseLeaveDelay={mouseLeaveDelay}
      popupStyle={overlayStyle}
      mouseEnterDelay={mouseEnterDelay}
      {...extraProps}
      getPopupContainer={getPopupContainer()}
      popup={<span>popuppopuppopup</span>}
      popupAlign={{
        points: ['tl', 'bl'],
        offset: [0, 3],
      }}
      popupVisible
    >
      <p></p>
    </Trigger>
  );
};

export default forwardRef(Tour);
