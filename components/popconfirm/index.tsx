import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import classNames from 'classnames';
import useMergedState from 'rc-util/lib/hooks/useMergedState';
import KeyCode from 'rc-util/lib/KeyCode';
import * as React from 'react';
import type { ButtonProps, LegacyButtonType } from '../button/button';
import { ConfigContext } from '../config-provider';
import Popover from '../popover';
import type { AbstractTooltipProps } from '../tooltip';
import type { RenderFunction } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';
import { Overlay } from './PurePanel';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
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
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

export interface PopconfirmState {
  visible?: boolean;
}

const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const { getPrefixCls } = React.useContext(ConfigContext);
  const [visible, setVisible] = useMergedState(false, {
    value: props.visible,
    defaultValue: props.defaultVisible,
  });

  // const isDestroyed = useDestroyed();

  const settingVisible = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    setVisible(value, true);
    props.onVisibleChange?.(value, e);
  };

  const close = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => props.onConfirm?.call(this, e);

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);
    props.onCancel?.call(this, e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC && visible) {
      settingVisible(false, e);
    }
  };

  const onVisibleChange = (value: boolean) => {
    const { disabled } = props;
    if (disabled) {
      return;
    }
    settingVisible(value);
  };

  const {
    prefixCls: customizePrefixCls,
    placement,
    children,
    overlayClassName,
    ...restProps
  } = props;
  const prefixCls = getPrefixCls('popover', customizePrefixCls);
  const prefixClsConfirm = getPrefixCls('popconfirm', customizePrefixCls);
  const overlayClassNames = classNames(prefixClsConfirm, overlayClassName);

  return (
    <Popover
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      onVisibleChange={onVisibleChange}
      visible={visible}
      _overlay={
        <Overlay
          {...props}
          prefixCls={prefixCls}
          close={close}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      }
      overlayClassName={overlayClassNames}
      ref={ref as any}
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Popover>
  );
});

Popconfirm.defaultProps = {
  placement: 'top' as PopconfirmProps['placement'],
  trigger: 'click' as PopconfirmProps['trigger'],
  okType: 'primary' as PopconfirmProps['okType'],
  icon: <ExclamationCircleFilled />,
  disabled: false,
};

export default Popconfirm;
