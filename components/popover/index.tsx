import * as React from 'react';
import Tooltip, { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import { ConfigContext } from '../config-provider';
import { getRenderPropValue, RenderFunction } from '../_util/getRenderPropValue';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
}

const Popover = React.forwardRef<unknown, PopoverProps>(
  ({ prefixCls: customizePrefixCls, title, content, ...otherProps }, ref) => {
    const { getPrefixCls } = React.useContext(ConfigContext);

    const getOverlay = (prefixCls: string) => {
      return (
        <>
          {title && <div className={`${prefixCls}-title`}>{getRenderPropValue(title)}</div>}
          <div className={`${prefixCls}-inner-content`}>{getRenderPropValue(content)}</div>
        </>
      );
    };

    const prefixCls = getPrefixCls('popover', customizePrefixCls);
    return (
      <Tooltip
        {...otherProps}
        prefixCls={prefixCls}
        ref={ref as any}
        overlay={getOverlay(prefixCls)}
      />
    );
  },
);

Popover.displayName = 'Popover';

Popover.defaultProps = {
  placement: 'top' as TooltipPlacement,
  transitionName: 'zoom-big',
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
};

export default Popover;
