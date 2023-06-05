import classNames from 'classnames';
import * as React from 'react';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { getTransitionName } from '../_util/motion';
import { ConfigContext } from '../config-provider';
import type { AbstractTooltipProps } from '../tooltip';
import Tooltip from '../tooltip';
import PurePanel from './PurePanel';
// CSSINJS
import useStyle from './style';

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

const Popover = React.forwardRef<unknown, PopoverProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    overlayClassName,
    placement = 'top',
    trigger = 'hover',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle = {},
    ...otherProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const rootPrefixCls = getPrefixCls();

  const overlayCls = classNames(overlayClassName, hashId);

  return wrapSSR(
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
      overlay={
        title || content ? <Overlay prefixCls={prefixCls} title={title} content={content} /> : null
      }
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', otherProps.transitionName)}
      data-popover-inject
    />,
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
