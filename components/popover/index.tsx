import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { AbstractTooltipProps, TooltipPlacement } from '../tooltip';
import Tooltip from '../tooltip';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { getTransitionName } from '../_util/motion';
import PurePanel, { getOverlay } from './PurePanel';
// CSSINJS
import useStyle from './style';

export interface PopoverProps extends AbstractTooltipProps {
  title?: React.ReactNode | RenderFunction;
  content?: React.ReactNode | RenderFunction;
  /** @private Used For Popconfirm. Safe to remove. */
  _overlay?: React.ReactNode;
}

const Popover = React.forwardRef<unknown, PopoverProps>(
  (
    { prefixCls: customizePrefixCls, title, content, overlayClassName, _overlay, ...otherProps },
    ref,
  ) => {
    const { getPrefixCls } = React.useContext(ConfigContext);

    const prefixCls = getPrefixCls('popover', customizePrefixCls);
    const [wrapSSR, hashId] = useStyle(prefixCls);
    const rootPrefixCls = getPrefixCls();

    const overlayCls = classNames(overlayClassName, hashId);

    return wrapSSR(
      <Tooltip
        {...otherProps}
        prefixCls={prefixCls}
        overlayClassName={overlayCls}
        ref={ref as any}
        overlay={_overlay || getOverlay(prefixCls, title, content)}
        transitionName={getTransitionName(rootPrefixCls, 'zoom-big', otherProps.transitionName)}
        data-popover-inject
      />,
    );
  },
) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<PopoverProps> & React.RefAttributes<unknown>
> & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

if (process.env.NODE_ENV !== 'production') {
  Popover.displayName = 'Popover';
}

Popover.defaultProps = {
  placement: 'top' as TooltipPlacement,
  trigger: 'hover',
  mouseEnterDelay: 0.1,
  mouseLeaveDelay: 0.1,
  overlayStyle: {},
};

Popover._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

export default Popover;
