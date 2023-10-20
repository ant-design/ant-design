import * as React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import { debounce } from 'throttle-debounce';

import { cloneElement, isValidElement } from '../_util/reactNode';
import { devUseWarning } from '../_util/warning';
import type { ConfigConsumerProps } from '../config-provider';
import { ConfigContext } from '../config-provider';
import useStyle from './style/index';

const SpinSizes = ['small', 'default', 'large'] as const;
export type SpinSize = typeof SpinSizes[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  tip?: React.ReactNode;
  delay?: number;
  wrapperClassName?: string;
  indicator?: SpinIndicator;
  children?: React.ReactNode;
  fullscreen?: boolean;
}

export interface SpinClassProps extends SpinProps {
  hashId: string;
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
      <i className={`${prefixCls}-dot-item`} key={1} />
      <i className={`${prefixCls}-dot-item`} key={2} />
      <i className={`${prefixCls}-dot-item`} key={3} />
      <i className={`${prefixCls}-dot-item`} key={4} />
    </span>
  );
}

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

const Spin: React.FC<SpinClassProps> = (props) => {
  const {
    spinPrefixCls: prefixCls,
    spinning: customSpinning = true,
    delay = 0,
    className,
    rootClassName,
    size = 'default',
    tip,
    wrapperClassName,
    style,
    children,
    hashId,
    fullscreen,
    ...restProps
  } = props;

  const [spinning, setSpinning] = React.useState<boolean>(
    () => customSpinning && !shouldDelay(customSpinning, delay),
  );

  React.useEffect(() => {
    if (customSpinning) {
      const showSpinning = debounce(delay, () => {
        setSpinning(true);
      });
      showSpinning();
      return () => {
        showSpinning?.cancel?.();
      };
    }

    setSpinning(false);
  }, [delay, customSpinning]);

  const isNestedPattern = React.useMemo<boolean>(
    () => typeof children !== 'undefined' && !fullscreen,
    [children, fullscreen],
  );

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Spin');

    warning(!tip || isNestedPattern, 'usage', '`tip` only work in nest pattern.');
  }

  const { direction, spin } = React.useContext<ConfigConsumerProps>(ConfigContext);

  const spinClassName = classNames(
    prefixCls,
    spin?.className,
    {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spinning,
      [`${prefixCls}-show-text`]: !!tip,
      [`${prefixCls}-fullscreen`]: fullscreen,
      [`${prefixCls}-fullscreen-show`]: fullscreen && spinning,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    hashId,
  );

  const containerClassName = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-blur`]: spinning,
  });

  // fix https://fb.me/react-unknown-prop
  const divProps = omit(restProps, ['indicator', 'prefixCls']);

  const mergedStyle: React.CSSProperties = { ...spin?.style, ...style };

  const spinElement: React.ReactNode = (
    <div
      {...divProps}
      style={mergedStyle}
      className={spinClassName}
      aria-live="polite"
      aria-busy={spinning}
    >
      {renderIndicator(prefixCls, props)}
      {tip && (isNestedPattern || fullscreen) ? (
        <div className={`${prefixCls}-text`}>{tip}</div>
      ) : null}
    </div>
  );

  if (isNestedPattern) {
    return (
      <div
        {...divProps}
        className={classNames(`${prefixCls}-nested-loading`, wrapperClassName, hashId)}
      >
        {spinning && <div key="loading">{spinElement}</div>}
        <div className={containerClassName} key="container">
          {children}
        </div>
      </div>
    );
  }
  return spinElement;
};

const SpinFC: SpinFCType = (props) => {
  const { prefixCls: customizePrefixCls } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const spinPrefixCls = getPrefixCls('spin', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(spinPrefixCls);

  const spinClassProps: SpinClassProps = {
    ...props,
    spinPrefixCls,
    hashId,
  };
  return wrapSSR(<Spin {...spinClassProps} />);
};

SpinFC.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  SpinFC.displayName = 'Spin';
}

export default SpinFC;
