import * as React from 'react';
import classNames from 'classnames';
import { debounce } from 'throttle-debounce';

import { devUseWarning } from '../_util/warning';
import { ConfigContext } from '../config-provider';
import Indicator from './Indicator';
import useStyle from './style/index';
import usePercent from './usePercent';

const _SpinSizes = ['small', 'default', 'large'] as const;
export type SpinSize = (typeof _SpinSizes)[number];
export type SpinIndicator = React.ReactElement<HTMLElement>;

export interface SpinProps {
  /** Customize prefix class name */
  prefixCls?: string;
  /** Additional class name of Spin */
  className?: string;
  /** Additional root class name of Spin */
  rootClassName?: string;
  /** Whether Spin is spinning */
  spinning?: boolean;
  /** Style of Spin */
  style?: React.CSSProperties;
  /** Size of Spin, options: `small`, `default` and `large` */
  size?: SpinSize;
  /** Customize description content when Spin has children */
  tip?: React.ReactNode;
  /** Specifies a delay in milliseconds for loading state (prevent flush) */
  delay?: number;
  /** The className of wrapper when Spin has children */
  wrapperClassName?: string;
  /** React node of the spinning indicator */
  indicator?: SpinIndicator;
  /** Children of Spin */
  children?: React.ReactNode;
  /** Display a backdrop with the `Spin` component */
  fullscreen?: boolean;
  percent?: number | 'auto';
}

export type SpinType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};

// Render indicator
let defaultIndicator: React.ReactNode | undefined;

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}

const Spin: SpinType = (props) => {
  const {
    prefixCls: customizePrefixCls,
    spinning: customSpinning = true,
    delay = 0,
    className,
    rootClassName,
    size = 'default',
    tip,
    wrapperClassName,
    style,
    children,
    fullscreen = false,
    indicator,
    percent,
    ...restProps
  } = props;

  const { getPrefixCls, direction, spin } = React.useContext(ConfigContext);

  const prefixCls = getPrefixCls('spin', customizePrefixCls);

  const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);

  const [spinning, setSpinning] = React.useState<boolean>(
    () => customSpinning && !shouldDelay(customSpinning, delay),
  );

  const mergedPercent = usePercent(spinning, percent);

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

    warning(
      !tip || isNestedPattern || fullscreen,
      'usage',
      '`tip` only work in nest or fullscreen pattern.',
    );
  }

  const spinClassName = classNames(
    prefixCls,
    spin?.className,
    {
      [`${prefixCls}-sm`]: size === 'small',
      [`${prefixCls}-lg`]: size === 'large',
      [`${prefixCls}-spinning`]: spinning,
      [`${prefixCls}-show-text`]: !!tip,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    !fullscreen && rootClassName,
    hashId,
    cssVarCls,
  );

  const containerClassName = classNames(`${prefixCls}-container`, {
    [`${prefixCls}-blur`]: spinning,
  });

  const mergedIndicator = indicator ?? spin?.indicator ?? defaultIndicator;

  const mergedStyle: React.CSSProperties = { ...spin?.style, ...style };

  const spinElement: React.ReactNode = (
    <div
      {...restProps}
      style={mergedStyle}
      className={spinClassName}
      aria-live="polite"
      aria-busy={spinning}
    >
      <Indicator prefixCls={prefixCls} indicator={mergedIndicator} percent={mergedPercent} />
      {tip && (isNestedPattern || fullscreen) ? (
        <div className={`${prefixCls}-text`}>{tip}</div>
      ) : null}
    </div>
  );

  if (isNestedPattern) {
    return wrapCSSVar(
      <div
        {...restProps}
        className={classNames(`${prefixCls}-nested-loading`, wrapperClassName, hashId, cssVarCls)}
      >
        {spinning && <div key="loading">{spinElement}</div>}
        <div className={containerClassName} key="container">
          {children}
        </div>
      </div>,
    );
  }

  if (fullscreen) {
    return wrapCSSVar(
      <div
        className={classNames(
          `${prefixCls}-fullscreen`,
          {
            [`${prefixCls}-fullscreen-show`]: spinning,
          },
          rootClassName,
          hashId,
          cssVarCls,
        )}
      >
        {spinElement}
      </div>,
    );
  }

  return wrapCSSVar(spinElement);
};

Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
