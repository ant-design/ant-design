import React from 'react';
import Tooltip from '../tooltip';
import { AbstractTooltipProps } from '../tooltip';
import Icon from '../icon';
import Button from '../button';

export interface PopconfirmProps extends AbstractTooltipProps {
  title: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
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

  componentWillReceiveProps(nextProps: PopconfirmProps) {
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
    const { prefixCls, title, placement, ...restProps } = props;

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
            <Button onClick={this.cancel} size="small">{cancelText || '取消'}</Button>
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
