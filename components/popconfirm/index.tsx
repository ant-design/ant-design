import * as React from 'react';
import Tooltip from '../tooltip';
import Icon from '../icon';
import Button from '../button';
import getPlacements from '../popover/placements';
import splitObject from '../_util/splitObject';
const placements = getPlacements();
const prefixCls = 'ant-popover';
const noop = () => {};

export interface PopconfirmProps {
  /**
   * Position of popup-container, options:`top`, `left`, `right`, `bottom`
   */
  placement?: 'top' | 'left' | 'right' | 'bottom';
  /** Description of Popconfirm */
  title: React.ReactNode;
  /** Callback when confirm */
  onConfirm?: () => void;
  /** Callback when cancel */
  onCancel?: () => void;
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
}

export interface PopconfirmContext {
  antLocale?: {
    Popconfirm?: any,
  };
}

export default class Popconfirm extends React.Component<PopconfirmProps, any> {
  static defaultProps = {
    transitionName: 'zoom-big',
    placement: 'top',
    trigger: 'click',
    overlayStyle: {},
    onConfirm: noop,
    onCancel: noop,
    onVisibleChange: noop,
  };

  static contextTypes = {
    antLocale: React.PropTypes.object,
  };

  context: PopconfirmContext;

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('visible' in nextProps) {
      this.setState({ visible: nextProps.visible });
    }
  }

  confirm = () => {
    this.setVisible(false);
    this.props.onConfirm.call(this);
  }

  cancel = () => {
    this.setVisible(false);
    this.props.onCancel.call(this);
  }

  onVisibleChange = (visible) => {
    this.setVisible(visible);
  }

  setVisible(visible) {
    if (!('visible' in this.props)) {
      this.setState({ visible });
    }
    this.props.onVisibleChange(visible);
  }

  render() {
    const [{ title, placement, overlayStyle, trigger }, restProps] = splitObject(this.props,
      ['title', 'placement', 'overlayStyle', 'trigger']);
    let { okText, cancelText } = this.props;
    if (this.context.antLocale && this.context.antLocale.Popconfirm) {
      okText = okText || this.context.antLocale.Popconfirm.okText;
      cancelText = cancelText || this.context.antLocale.Popconfirm.cancelText;
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
      <Tooltip {...restProps}
        placement={placement}
        builtinPlacements={placements}
        overlayStyle={overlayStyle}
        prefixCls={prefixCls}
        onVisibleChange={this.onVisibleChange}
        transitionName={this.props.transitionName}
        visible={this.state.visible}
        trigger={trigger}
        overlay={overlay}
      >
        {this.props.children}
      </Tooltip>
    );
  }
}
