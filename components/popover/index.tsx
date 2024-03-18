import * as React from 'react';
import classNames from 'classnames';

import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { getTransitionName } from '../_util/motion';
import { ConfigContext } from '../config-provider';
import type { AbstractTooltipProps, TooltipRef } from '../tooltip';
import Tooltip from '../tooltip';
import PurePanel from './PurePanel';
// CSSINJS
import useStyle from './style';
import KeyCode from 'rc-util/lib/KeyCode';
import { cloneElement } from '../_util/reactNode';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
}

interface OverlayProps {
  prefixCls?: string;
  title?: PopoverProps['title'];
  content?: PopoverProps['content'];
}

const Overlay: React.FC<OverlayProps> = ({ title, content, prefixCls }) => (
  <>
    {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
    <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
  </>
);

const Popover = React.forwardRef<TooltipRef, PopoverProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = 'top',
    trigger = 'hover',
    children,
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle = {},
    ...otherProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
  const rootPrefixCls = getPrefixCls();

  const overlayCls = classNames(overlayClassName, hashId, cssVarCls);
  const [open, setOpen] = React.useState(props.open ?? props.visible);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC) {
      console.log('esc');

      setOpen(false);
    }
  };

  return wrapCSSVar(
    <Tooltip
      placement={placement}
      trigger={trigger}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      overlayStyle={overlayStyle}
      {...otherProps}
      prefixCls={prefixCls}
      overlayClassName={overlayCls}
      ref={ref}
      open={open}
      overlay={
        title || content ? <Overlay prefixCls={prefixCls} title={title} content={content} /> : null
      }
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', otherProps.transitionName)}
      data-popover-inject
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Tooltip>,
  );
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PopoverProps> & React.RefAttributes<unknown>
> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Popover;
