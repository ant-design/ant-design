import * as React from 'react';
import * as PropTypes from 'prop-types';
import RcSteps from 'rc-steps';
import Icon from '../icon';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  className?: string;
  current?: number;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  status?: 'wait' | 'process' | 'finish' | 'error';
  size?: 'default' | 'small';
  direction?: 'horizontal' | 'vertical';
  progressDot?: boolean | Function;
  style?: React.CSSProperties;
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = RcSteps.Step;

  static defaultProps = {
    prefixCls: 'ant-steps',
    iconPrefix: 'ant',
    current: 0,
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    iconPrefix: PropTypes.string,
    current: PropTypes.number,
  };

  render() {
    const { prefixCls } = this.props;
    const icons = {
      finish: <Icon type="check" className={`${prefixCls}-finish-icon`} />,
      error: <Icon type="close" className={`${prefixCls}-error-icon`} />,
    };
    return <RcSteps icons={icons} {...this.props} />;
  }
}
