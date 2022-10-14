import classNames from 'classnames';
import debounce from 'lodash/debounce';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigConsumer, ConfigContext } from '../config-provider';
import { cloneElement, isValidElement } from '../_util/reactNode';
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
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
  children?: React.ReactNode;
}

export interface SpinClassProps extends SpinProps {
  spinPrefixCls: string;
}

export type SpinFCType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};

// Render indicator
let defaultIndicator: React.ReactNode = null;

function renderIndicator(prefixCls: string, props: SpinClassProps): React.ReactNode {
  const { indicator } = props;
  const dotClassName = `${prefixCls}-dot`;

  // should not be render default indicator when indicator value is null
  if (indicator === null) {
    return null;
  }

  if (isValidElement(indicator)) {
    return cloneElement(indicator, {
      className: classNames(indicator.props.className, dotClassName),
    });
  }

  if (isValidElement(defaultIndicator)) {
    return cloneElement(defaultIndicator, {
      className: classNames(defaultIndicator.props.className, dotClassName),
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

const Spin: React.FC<SpinClassProps> = props => {
  const {
    spinPrefixCls: prefixCls,
    spinning: customSpinning = true,
    delay,
    className,
    size = 'default',
    tip,
    wrapperClassName,
    style,
    children,
    ...restProps
  } = props;

  const [spinning, setSpinning] = React.useState<boolean>(
    () => customSpinning && !shouldDelay(customSpinning, delay),
  );

  React.useEffect(() => {
    const updateSpinning = debounce<() => void>(() => {
      setSpinning(customSpinning);
    }, delay);
    updateSpinning();
    return () => {
      updateSpinning?.cancel?.();
    };
  }, [delay, customSpinning]);

  const isNestedPattern = () => typeof children !== 'undefined';

  const renderSpin = ({ direction }: ConfigConsumerProps) => {
    const spinClassName = classNames(
      prefixCls,
      {
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [`${prefixCls}-spinning`]: spinning,
        [`${prefixCls}-show-text`]: !!tip,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );

    // fix https://fb.me/react-unknown-prop
    const divProps = omit(restProps, ['indicator', 'prefixCls']);

    const spinElement = (
      <div
        {...divProps}
        style={style}
        className={spinClassName}
        aria-live="polite"
        aria-busy={spinning}
      >
        {renderIndicator(prefixCls, props)}
        {tip ? <div className={`${prefixCls}-text`}>{tip}</div> : null}
      </div>
    );

    if (isNestedPattern()) {
      const containerClassName = classNames(`${prefixCls}-container`, {
        [`${prefixCls}-blur`]: spinning,
      });
      return (
        <div {...divProps} className={classNames(`${prefixCls}-nested-loading`, wrapperClassName)}>
          {spinning && <div key="loading">{spinElement}</div>}
          <div className={containerClassName} key="container">
            {children}
          </div>
        </div>
      );
    }
    return spinElement;
  };
  return <ConfigConsumer>{renderSpin}</ConfigConsumer>;
};

const SpinFC: SpinFCType = props => {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);

  const spinClassProps: SpinClassProps = {
    ...props,
    spinPrefixCls,
  };
  return <Spin {...spinClassProps} />;
};

SpinFC.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  SpinFC.displayName = 'Spin';
}

export default SpinFC;
