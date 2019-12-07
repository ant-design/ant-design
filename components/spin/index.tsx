import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';
import debounce from 'lodash/debounce';
import { ConfigConsumer, ConfigConsumerProps } from '../config-provider';
import { tuple } from '../_util/type';

const SpinSizes = tuple('small', 'default', 'large');
export type SpinSize = typeof SpinSizes[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: string;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
}

export interface SpinState {
  spinning?: boolean;
  notCssAnimationSupported?: boolean;
}

// Render indicator
let defaultIndicator: React.ReactNode = null;

function renderIndicator(prefixCls: string, props: SpinProps): React.ReactNode {
  const { indicator } = props;
  const dotClassName = `${prefixCls}-dot`;

  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }

  if (React.isValidElement(indicator)) {
    return React.cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }

  if (React.isValidElement(defaultIndicator)) {
    return React.cloneElement(defaultIndicator as SpinIndicator, {
      className: classNames((defaultIndicator as SpinIndicator).props.className, dotClassName),
    });
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
      <i className={`${prefixCls}-dot-item`} />
    </span>
  );
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

class Spin extends React.Component<SpinProps, SpinState> {
  static defaultProps = {
    spinning: true,
    size: 'default' as SpinSize,
    wrapperClassName: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(SpinSizes),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.element,
  };

  static setDefaultIndicator(indicator: React.ReactNode) {
    defaultIndicator = indicator;
  }

  originalUpdateSpinning: () => void;

  constructor(props: SpinProps) {
    super(props);

    const { spinning, delay } = props;
    const shouldBeDelayed = shouldDelay(spinning, delay);
    this.state = {
      spinning: spinning && !shouldBeDelayed,
    };
    this.originalUpdateSpinning = this.updateSpinning;
    this.debouncifyUpdateSpinning(props);
  }

  componentDidMount() {
    this.updateSpinning();
  }

  componentDidUpdate() {
    this.debouncifyUpdateSpinning();
    this.updateSpinning();
  }

  componentWillUnmount() {
    this.cancelExistingSpin();
  }

  debouncifyUpdateSpinning = (props?: SpinProps) => {
    const { delay } = props || this.props;
    if (delay) {
      this.cancelExistingSpin();
      this.updateSpinning = debounce(this.originalUpdateSpinning, delay);
    }
  };

  updateSpinning = () => {
    const { spinning } = this.props;
    const { spinning: currentSpinning } = this.state;
    if (currentSpinning !== spinning) {
      this.setState({ spinning });
    }
  };

  cancelExistingSpin() {
    const { updateSpinning } = this;
    if (updateSpinning && (updateSpinning as any).cancel) {
      (updateSpinning as any).cancel();
    }
  }

  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  renderSpin = ({ getPrefixCls }: ConfigConsumerProps) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      size,
      tip,
      wrapperClassName,
      style,
      ...restProps
    } = this.props;
    const { spinning } = this.state;

    const prefixCls = getPrefixCls('spin', customizePrefixCls);
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
      },
      className,
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['spinning', 'delay', 'indicator']);

    const spinElement = (
      <div {...divProps} style={style} className={spinClassName}>
        {renderIndicator(prefixCls, this.props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );
    if (this.isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...divProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {this.props.children}
          </div>
        </div>
      );
    }
    return spinElement;
  };

  render() {
    return <ConfigConsumer>{this.renderSpin}</ConfigConsumer>;
  }
}

export default Spin;
