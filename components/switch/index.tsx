import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSwitch from 'rc-switch';
import classNames from 'classnames';
import omit from 'omit.js';
import { Loading } from '@ant-design/icons';

import Wave from '../_util/wave';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';

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

  static propTypes = {
    prefixCls: PropTypes.string,
    // HACK: https://github.com/ant-design/ant-design/issues/5368
    // size=default and size=large are the same
    size: PropTypes.oneOf(['small', 'default', 'large']) as PropTypes.Requireable<
      SwitchProps['size']
    >,
    className: PropTypes.string,
  };

  private rcSwitch: typeof RcSwitch;

  saveSwitch = (node: typeof RcSwitch) => {
    this.rcSwitch = node;
  };

  focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  renderSwitch = ({ getPrefixCls }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, size, loading, className = '', disabled } = this.props;
    const prefixCls = getPrefixCls('switch', customizePrefixCls);
    const classes = classNames(className, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-loading`]: loading,
    });
    const loadingIcon = loading ? <Loading className={`${prefixCls}-loading-icon`} /> : null;
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
  };

  render() {
    return <ConfigConsumer>{this.renderSwitch}</ConfigConsumer>;
  }
}
