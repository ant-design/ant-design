import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import omit from 'omit.js';

export type SpinSize = 'small' | 'default' | 'large';
export type SpinIndicator = React.ReactElement<any>;

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

function renderIndicator(props: SpinProps): React.ReactNode {
  const { prefixCls, indicator } = props;
  const dotClassName = `${prefixCls}-dot`;
  if (React.isValidElement(indicator)) {
    return React.cloneElement(indicator as SpinIndicator, {
      className: classNames((indicator as SpinIndicator).props.className, dotClassName),
    });
  }

  if (React.isValidElement(defaultIndicator)) {
    return React.cloneElement(defaultIndicator as SpinIndicator, {
      className: classNames((defaultIndicator as SpinIndicator).props.className, dotClassName),
    });
  }

  return (
    <span className={classNames(dotClassName, `${prefixCls}-dot-spin`)}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

class Spin extends React.Component<SpinProps, SpinState> {
  static defaultProps = {
    prefixCls: 'ant-spin',
    spinning: true,
    size: 'default' as SpinSize,
    wrapperClassName: '',
  };

  static propTypes = {
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    spinning: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'default', 'large']),
    wrapperClassName: PropTypes.string,
    indicator: PropTypes.node,
  };

  static setDefaultIndicator(indicator: React.ReactNode) {
    defaultIndicator = indicator;
  }

  debounceTimeout: number;
  delayTimeout: number;

  constructor(props: SpinProps) {
    super(props);

    const { spinning, delay } = props;
    this.state = {
      spinning: spinning && !shouldDelay(spinning, delay),
    };
  }

  isNestedPattern() {
    return !!(this.props && this.props.children);
  }

  componentWillUnmount() {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (this.delayTimeout) {
      clearTimeout(this.delayTimeout);
    }
  }

  componentDidUpdate() {
    const currentSpinning = this.state.spinning;
    const spinning = this.props.spinning;
    if (currentSpinning === spinning) {
      return;
    }
    const { delay } = this.props;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (currentSpinning && !spinning) {
      this.debounceTimeout = window.setTimeout(() => this.setState({ spinning }), 200);
      if (this.delayTimeout) {
        clearTimeout(this.delayTimeout);
      }
    } else {
      if (shouldDelay(spinning, delay)) {
        if (this.delayTimeout) {
          clearTimeout(this.delayTimeout);
        }
        this.delayTimeout = window.setTimeout(this.delayUpdateSpinning, delay);
      } else {
        this.setState({ spinning });
      }
    }
  }

  delayUpdateSpinning = () => {
    const { spinning } = this.props;
    if (this.state.spinning !== spinning) {
      this.setState({ spinning });
    }
  };

  render() {
    const { className, size, prefixCls, tip, wrapperClassName, style, ...restProps } = this.props;
    const { spinning } = this.state;

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
        {renderIndicator(this.props)}
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
  }
}

export default Spin;
