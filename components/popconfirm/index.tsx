import * as React from 'react';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import { omit, useControlledState } from '@rc-component/util';
import { clsx } from 'clsx';

import type { RenderFunction } from '../_util/getRenderPropValue';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { useMergeSemantic } from '../_util/hooks';
import type { ButtonProps, LegacyButtonType } from '../button/Button';
import { useComponentConfig } from '../config-provider/context';
import type {
  PopoverProps,
  PopoverSemanticClassNames,
  PopoverSemanticName,
  PopoverSemanticStyles,
} from '../popover';
import Popover from '../popover';
import type { AbstractTooltipProps, TooltipRef } from '../tooltip';
import useMergedArrow from '../tooltip/hook/useMergedArrow';
import PurePanel, { Overlay } from './PurePanel';
import useStyle from './style';

export type PopconfirmSemanticName = PopoverSemanticName;

export type PopconfirmClassNamesType = SemanticClassNamesType<
  PopconfirmProps,
  PopoverSemanticClassNames
>;

export type PopconfirmStylesType = SemanticStylesType<PopconfirmProps, PopoverSemanticStyles>;

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  description?: React.ReactNode | RenderFunction;
  disabled?: boolean;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  showCancel?: boolean;
  icon?: React.ReactNode;
  onOpenChange?: (
    open: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  onPopupClick?: (e: React.MouseEvent<HTMLElement>) => void;
  classNames?: PopconfirmClassNamesType;
  styles?: PopconfirmStylesType;
}

export interface PopconfirmState {
  open?: boolean;
}

const InternalPopconfirm = React.forwardRef<TooltipRef, PopconfirmProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    placement = 'top',
    trigger,
    okType = 'primary',
    icon = <ExclamationCircleFilled />,
    children,
    overlayClassName,
    onOpenChange,
    overlayStyle,
    styles,
    arrow: popconfirmArrow,
    classNames,
    ...restProps
  } = props;
  const {
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
    arrow: contextArrow,
    trigger: contextTrigger,
  } = useComponentConfig('popconfirm');
  const [open, setOpen] = useControlledState(props.defaultOpen ?? false, props.open);
  const mergedArrow = useMergedArrow(popconfirmArrow, contextArrow);
  const mergedTrigger = trigger || contextTrigger || 'click';

  const settingOpen: PopoverProps['onOpenChange'] = (value, e) => {
    setOpen(value);
    onOpenChange?.(value, e);
  };

  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingOpen(false, e);
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingOpen(false, e);
    props.onCancel?.call(this, e);
  };

  const onInternalOpenChange: PopoverProps['onOpenChange'] = (value, e) => {
    const { disabled = false } = props;
    if (disabled) {
      return;
    }
    settingOpen(value, e);
  };

  const prefixCls = getPrefixCls('popconfirm', customizePrefixCls);

  const mergedProps: PopconfirmProps = {
    ...props,
    placement,
    trigger: mergedTrigger,
    okType,
    overlayStyle,
    styles,
    classNames,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    PopconfirmClassNamesType,
    PopconfirmStylesType,
    PopconfirmProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const rootClassNames = clsx(prefixCls, contextClassName, overlayClassName, mergedClassNames.root);

  useStyle(prefixCls);

  return (
    <Popover
      arrow={mergedArrow}
      {...omit(restProps, ['title'])}
      trigger={mergedTrigger}
      placement={placement}
      onOpenChange={onInternalOpenChange}
      open={open}
      ref={ref}
      classNames={{
        root: rootClassNames,
        container: mergedClassNames.container,
        arrow: mergedClassNames.arrow,
      }}
      styles={{
        root: { ...contextStyle, ...mergedStyles.root, ...overlayStyle },
        container: mergedStyles.container,
        arrow: mergedStyles.arrow,
      }}
      content={
        <Overlay
          okType={okType}
          icon={icon}
          {...props}
          prefixCls={prefixCls}
          close={close}
          onConfirm={onConfirm}
          onCancel={onCancel}
          classNames={mergedClassNames}
          styles={mergedStyles}
        />
      }
      data-popover-inject
    >
      {children}
    </Popover>
  );
});

type CompoundedComponent = typeof InternalPopconfirm & {
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PurePanel;
};

const Popconfirm = InternalPopconfirm as CompoundedComponent;

// We don't care debug panel
/* istanbul ignore next */
Popconfirm._InternalPanelDoNotUseOrYouWillBeFired = PurePanel;

if (process.env.NODE_ENV !== 'production') {
  Popconfirm.displayName = 'Popconfirm';
}

export default Popconfirm;
