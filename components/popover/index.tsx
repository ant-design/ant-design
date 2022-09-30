import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { AbstractTooltipProps } from '../tooltip';
import Tooltip from '../tooltip';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { getRenderPropValue } from '../_util/getRenderPropValue';
import { getTransitionName } from '../_util/motion';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
  /** @internal Used For Popconfirm. Safe to remove. */
  _overlay?: React.ReactNode;
}

interface OverlayPorps {
  prefixCls?: string;
  title?: PopoverProps['title'];
  content?: PopoverProps['content'];
}

const Overlay: React.FC<OverlayPorps> = ({ title, content, prefixCls }) => {
  if (!title && !content) {
    return null;
  }
  return (
    <>
      {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
      <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
    </>
  );
};

const Popover = React.forwardRef<unknown, PopoverProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    title,
    content,
    _overlay,
    placement = 'top',
    trigger = 'hover',
    mouseEnterDelay = 0.1,
    mouseLeaveDelay = 0.1,
    overlayStyle = {},
    ...otherProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const rootPrefixCls = getPrefixCls();

  return (
    <Tooltip
      placement={placement}
      trigger={trigger}
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      overlayStyle={overlayStyle}
      {...otherProps}
      prefixCls={prefixCls}
      ref={ref}
      overlay={_overlay || <Overlay prefixCls={prefixCls} title={title} content={content} />}
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', otherProps.transitionName)}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

export default Popover;
