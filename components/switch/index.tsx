import * as React from 'react';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import omit from 'omit.js';
import { LoadingOutlined } from '@ant-design/icons';

import Wave from '../_util/wave';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import warning from '../_util/warning';
import SizeContext from '../config-provider/SizeContext';

export type SwitchSize = 'small' | 'default';
export type SwitchChangeEventHandler = (checked: boolean, event: MouseEvent) => void;
export type SwitchClickEventHandler = SwitchChangeEventHandler;

export interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  title?: string;
}

export default class Switch extends React.Component<SwitchProps, {}> {
  static __ANT_SWITCH = true;

  private rcSwitch: typeof RcSwitch;

  constructor(props: SwitchProps) {
    super(props);

    warning(
      'checked' in props || !('value' in props),
      'Switch',
      '`value` is not validate prop, do you mean `checked`?',
    );
  }

  saveSwitch = (node: typeof RcSwitch) => {
    this.rcSwitch = node;
  };

  focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  renderSwitch = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      size: customizeSize,
      loading,
      className = '',
      disabled,
    } = this.props;
    const prefixCls = getPrefixCls('switch', customizePrefixCls);
    const loadingIcon = loading ? (
      <LoadingOutlined className={`${prefixCls}-loading-icon`} />
    ) : null;
    return (
      <SizeContext.Consumer>
        {size => {
          const classes = classNames(className, {
            [`${prefixCls}-small`]: (customizeSize || size) === 'small',
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-rtl`]: direction === 'rtl',
          });

          return (
            <Wave insertExtraNode>
              <RcSwitch
                {...omit(this.props, ['loading'])}
                prefixCls={prefixCls}
                className={classes}
                disabled={disabled || loading}
                ref={this.saveSwitch}
                loadingIcon={loadingIcon}
              />
            </Wave>
          );
        }}
      </SizeContext.Consumer>
    );
  };

  render() {
    return <ConfigConsumer>{this.renderSwitch}</ConfigConsumer>;
  }
}
