import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import Tooltip, { AbstractTooltipProps } from '../tooltip';
import Icon from '../icon';
import Button from '../button';
import { ButtonType, NativeButtonProps } from '../button/button';
import LocaleReceiver from '../locale-provider/LocaleReceiver';
import defaultLocale from '../locale/default';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode;
  disabled?: boolean;
  onConfirm?: (e?: React.MouseEvent<HTMLElement>) => void;
  onCancel?: (e?: React.MouseEvent<HTMLElement>) => void;
  okText?: React.ReactNode;
  okType?: ButtonType;
  cancelText?: React.ReactNode;
  okButtonProps?: NativeButtonProps;
  cancelButtonProps?: NativeButtonProps;
  icon?: React.ReactNode;
  onVisibleChange?: (visible: boolean, e?: React.MouseEvent<HTMLElement>) => void;
}

export interface PopconfirmState {
  visible?: boolean;
}

export interface PopconfirmLocale {
  okText: string;
  cancelText: string;
}

class Popconfirm extends React.Component<PopconfirmProps, PopconfirmState> {
  static defaultProps = {
    transitionName: 'zoom-big',
    placement: 'top' as PopconfirmProps['placement'],
    trigger: 'click' as PopconfirmProps['trigger'],
    okType: 'primary' as PopconfirmProps['okType'],
    icon: <Icon type="exclamation-circle" theme="filled" />,
    disabled: false,
  };

  static getDerivedStateFromProps(nextProps: PopconfirmProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    }
    if ('defaultVisible' in nextProps) {
      return { visible: nextProps.defaultVisible };
    }
    return null;
  }

  private tooltip: any;

  constructor(props: PopconfirmProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  getPopupDomNode() {
    return this.tooltip.getPopupDomNode();
  }

  onConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setVisible(false, e);

    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm.call(this, e);
    }
  };

  onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    this.setVisible(false, e);

    const { onCancel } = this.props;
    if (onCancel) {
      onCancel.call(this, e);
    }
  };

  onVisibleChange = (visible: boolean) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    this.setVisible(visible);
  };

  setVisible(visible: boolean, e?: React.MouseEvent<HTMLButtonElement>) {
    const { props } = this;
    if (!('visible' in props)) {
      this.setState({ visible });
    }

    const { onVisibleChange } = props;
    if (onVisibleChange) {
      onVisibleChange(visible, e);
    }
  }

  saveTooltip = (node: any) => {
    this.tooltip = node;
  };

  renderOverlay = (prefixCls: string, popconfirmLocale: PopconfirmLocale) => {
    const {
      okButtonProps,
      cancelButtonProps,
      title,
      cancelText,
      okText,
      okType,
      icon,
    } = this.props;
    return (
      <div>
        <div className={`${prefixCls}-inner-content`}>
          <div className={`${prefixCls}-message`}>
            {icon}
            <div className={`${prefixCls}-message-title`}>{title}</div>
          </div>
          <div className={`${prefixCls}-buttons`}>
            <Button onClick={this.onCancel} size="small" {...cancelButtonProps}>
              {cancelText || popconfirmLocale.cancelText}
            </Button>
            <Button onClick={this.onConfirm} type={okType} size="small" {...okButtonProps}>
              {okText || popconfirmLocale.okText}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  renderConfirm = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, placement, ...restProps } = this.props;
    const prefixCls = getPrefixCls('popover', customizePrefixCls);

    const overlay = (
      <LocaleReceiver componentName="Popconfirm" defaultLocale={defaultLocale.Popconfirm}>
        {(popconfirmLocale: PopconfirmLocale) => this.renderOverlay(prefixCls, popconfirmLocale)}
      </LocaleReceiver>
    );

    return (
      <Tooltip
        {...restProps}
        prefixCls={prefixCls}
        placement={placement}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        overlay={overlay}
        ref={this.saveTooltip}
      />
    );
  };

  render() {
    return <ConfigConsumer>{this.renderConfirm}</ConfigConsumer>;
  }
}

polyfill(Popconfirm);

export default Popconfirm;
