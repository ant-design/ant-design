import * as React from 'react';
import omit from 'omit.js';
import RcSteps from 'rc-steps';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import { ConfigContext } from '../config-provider';
import Progress from '../progress';
import useBreakpoint from '../grid/hooks/useBreakpoint';

export interface StepsProps {
  type?: 'default' | 'navigation';
  className?: string;
  current?: number;
  direction?: 'horizontal' | 'vertical';
  iconPrefix?: string;
  initial?: number;
  labelPlacement?: 'horizontal' | 'vertical';
  prefixCls?: string;
  progressDot?: boolean | Function;
  responsive?: boolean;
  size?: 'default' | 'small';
  status?: 'wait' | 'process' | 'finish' | 'error';
  style?: React.CSSProperties;
  percent?: number;
  onChange?: (current: number) => void;
}

export interface StepProps {
  className?: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  status?: 'wait' | 'process' | 'finish' | 'error';
  disabled?: boolean;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  style?: React.CSSProperties;
}

interface StepsType extends React.FC<StepsProps> {
  Step: React.ClassicComponentClass<StepProps>;
}

const Steps: StepsType = props => {
  const { percent, size, className, direction, responsive } = props;
  const { xs } = useBreakpoint();
  const { getPrefixCls, direction: rtlDirection } = React.useContext(ConfigContext);

  const getDirection = React.useCallback(() => (responsive && xs ? 'vertical' : direction), [
    xs,
    direction,
  ]);

  const prefixCls = getPrefixCls('steps', props.prefixCls);
  const iconPrefix = getPrefixCls('', props.iconPrefix);
  const stepsClassName = classNames(
    {
      [`${prefixCls}-rtl`]: rtlDirection === 'rtl',
      [`${prefixCls}-with-progress`]: percent !== undefined,
    },
    className,
  );
  const icons = {
    finish: <CheckOutlined className={`${prefixCls}-finish-icon`} />,
    error: <CloseOutlined className={`${prefixCls}-error-icon`} />,
  };
  const stepIconRender = ({
    node,
    status,
  }: {
    node: React.ReactNode;
    index: number;
    status: string;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
  }) => {
    if (status === 'process' && percent !== undefined) {
      // currently it's hard-coded, since we can't easily read the actually width of icon
      const progressWidth = size === 'small' ? 32 : 40;
      const iconWithProgress = (
        <div className={`${prefixCls}-progress-icon`}>
          <Progress
            type="circle"
            percent={percent}
            width={progressWidth}
            strokeWidth={4}
            format={() => null}
          />
          {node}
        </div>
      );
      return iconWithProgress;
    }
    return node;
  };
  return (
    <RcSteps
      icons={icons}
      {...omit(props, ['percent'])}
      direction={getDirection()}
      stepIcon={stepIconRender}
      prefixCls={prefixCls}
      iconPrefix={iconPrefix}
      className={stepsClassName}
    />
  );
};

Steps.Step = RcSteps.Step;

Steps.defaultProps = {
  current: 0,
};

export default Steps;
