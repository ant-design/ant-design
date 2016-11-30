import React from 'react';
import Tooltip from '../tooltip';
import { TooltipPlacement } from '../tooltip';
import Icon from '../icon';
import Button from '../button';
import splitObject from '../_util/splitObject';

export interface PopconfirmProps {
  placement?: TooltipPlacement;
  /** Description of Popconfirm */
  title: React.ReactNode | string;
  /** Callback when confirm */
  onConfirm?: () => void;
  /** Callback when cancel */
  onCancel?: () => void;
  visible?: boolean;
  /** Callback when display/hide */
  onVisibleChange?: (visible: boolean) => void;
  /** Confirm button text */
  okText?: React.ReactNode;
  /** Cancel button text */
  cancelText?: React.ReactNode;
  style?: React.CSSProperties;
  transitionName?: string;
  trigger?: 'hover' | 'focus' | 'click';
  /** Style of overlay */
  overlayStyle?: React.CSSProperties;
  prefixCls?: string;
  openClassName?: string;
  arrowPointAtCenter?: boolean;
}

export interface PopconfirmContext {
  antLocale?: {
    Popconfirm?: any,
  };
}

export default class Popconfirm extends React.Component<PopconfirmProps, any> {
  static defaultProps = {
    prefixCls: 'ant-popover',
    transitionName: 'zoom-big',
    placement: 'top',
    trigger: 'click',
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: PopconfirmContext;

  constructor(props: PopconfirmProps) {
    super(props);

    this.state = {
      visible: props.visible,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  confirm = () => {
    this.setVisible(false);

    const onConfirm = this.props.onConfirm;
    if (onConfirm) {
      onConfirm.call(this);
    }
  }

  cancel = () => {
    this.setVisible(false);

    const onCancel = this.props.onCancel;
    if (onCancel) {
      onCancel.call(this);
    }
  }

  onVisibleChange = (visible) => {
    this.setVisible(visible);
  }

  setVisible(visible) {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({ visible });
    }

    const onVisibleChange = props.onVisibleChange;
    if (onVisibleChange) {
      onVisibleChange(visible);
    }
  }

  render() {
    const { props, context } = this;
    const [{ prefixCls, title, placement }, restProps] =
      splitObject(props, ['prefixCls', 'title', 'placement']);

    let { okText, cancelText } = props;
    const popconfirmLocale = context.antLocale && context.antLocale.Popconfirm;
    if (popconfirmLocale) {
      okText = okText || popconfirmLocale.okText;
      cancelText = cancelText || popconfirmLocale.cancelText;
    }

    const overlay = (
      <div>
        <div className={`${prefixCls}-inner-content`}>
          <div className={`${prefixCls}-message`}>
            <Icon type="exclamation-circle" />
            <div className={`${prefixCls}-message-title`}>{title}</div>
          </div>
          <div className={`${prefixCls}-buttons`}>
            <Button onClick={this.cancel} type="ghost" size="small">{cancelText || '取消'}</Button>
            <Button onClick={this.confirm} type="primary" size="small">{okText || '确定'}</Button>
          </div>
        </div>
      </div>
    );

    return (
      <Tooltip
        {...restProps}
        prefixCls={prefixCls}
        placement={placement}
        onVisibleChange={this.onVisibleChange}
        visible={this.state.visible}
        overlay={overlay}
      />
    );
  }
}
