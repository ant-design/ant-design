import * as React from 'react';
import classNames from 'classnames';
import ExclamationCircleFilled from '@ant-design/icons/ExclamationCircleFilled';
import KeyCode from 'rc-util/lib/KeyCode';
import Tooltip, { AbstractTooltipProps } from '../tooltip';
import Button from '../button';
import { LegacyButtonType, NativeButtonProps, convertLegacyProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigContext } from '../config-provider';
import { getRenderPropValue, RenderFunction } from '../_util/getRenderPropValue';
import { cloneElement } from '../_util/reactNode';
import { getTransitionName } from '../_util/motion';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode | RenderFunction;
  disabled?: boolean;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  okType?: LegacyButtonType;
  cancelText?: React.ReactNode;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  icon?: React.ReactNode;
  onVisibleChange?: (
    visible: boolean,
    e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
}

export interface PopconfirmState {
  visible?: boolean;
}

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

const Popconfirm = React.forwardRef<unknown, PopconfirmProps>((props, ref) => {
  const [visible, setVisible] = React.useState(props.visible);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible);
    }
  }, [props.visible]);

  React.useEffect(() => {
    if ('defaultVisible' in props) {
      setVisible(props.defaultVisible);
    }
  }, [props.defaultVisible]);

  const settingVisible = (
    value: boolean,
    e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!('visible' in props)) {
      setVisible(value);
    }

    if (props.onVisibleChange) {
      props.onVisibleChange(value, e);
    }
  };

  const onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);

    if (props.onConfirm) {
      props.onConfirm.call(this, e);
    }
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    settingVisible(false, e);

    if (props.onCancel) {
      props.onCancel.call(this, e);
    }
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

  const renderOverlay = (prefixCls: string, popconfirmLocale: PopconfirmLocale) => {
    const { okButtonProps, cancelButtonProps, title, cancelText, okText, okType, icon } = props;
    return (
      <div className={`${prefixCls}-inner-content`}>
        <div className={`${prefixCls}-message`}>
          {icon}
          <div className={`${prefixCls}-message-title`}>{getRenderPropValue(title)}</div>
        </div>
        <div className={`${prefixCls}-buttons`}>
          <Button onClick={onCancel} size="small" {...cancelButtonProps}>
            {cancelText || popconfirmLocale.cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            {...convertLegacyProps(okType)}
            size="small"
            {...okButtonProps}
          >
            {okText || popconfirmLocale.okText}
          </Button>
        </div>
      </div>
    );
  };

  const { getPrefixCls } = React.useContext(ConfigContext);

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

  const overlay = (
    <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
      {(popconfirmLocale: PopconfirmLocale) => renderOverlay(prefixCls, popconfirmLocale)}
    </LocaleReceiver>
  );
  const rootPrefixCls = getPrefixCls();

  return (
    <Tooltip
      {...restProps}
      prefixCls={prefixCls}
      placement={placement}
      onVisibleChange={onVisibleChange}
      visible={visible}
      overlay={overlay}
      overlayClassName={overlayClassNames}
      ref={ref as any}
      transitionName={getTransitionName(rootPrefixCls, 'zoom-big', props.transitionName)}
    >
      {cloneElement(children, {
        onKeyDown: (e: React.KeyboardEvent<any>) => {
          if (React.isValidElement(children)) {
            children?.props.onKeyDown?.(e);
          }
          onKeyDown(e);
        },
      })}
    </Tooltip>
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
