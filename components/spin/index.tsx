import * as React from 'react';
import { clsx } from 'clsx';
import { debounce } from 'throttle-debounce';

import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import Indicator from './Indicator';
import useStyle from './style/index';
import usePercent from './usePercent';

const _SpinSizes = ['small', 'default', 'large'] as const;

export type SpinSize = (typeof _SpinSizes)[number];

export type SpinIndicator = React.ReactElement<HTMLElement>;

export type SpinSemanticName = keyof SpinSemanticClassNames & keyof SpinSemanticStyles;

export type SpinSemanticClassNames = {
  root?: string;
  section?: string;
  indicator?: string;
  description?: string;

  container?: string;

  /** @deprecated Please use `description` instead */
  tip?: string;
  /** @deprecated Please use `root` instead */
  mask?: string;
};

export type SpinSemanticStyles = {
  root?: React.CSSProperties;
  section?: React.CSSProperties;
  indicator?: React.CSSProperties;
  description?: React.CSSProperties;

  container?: React.CSSProperties;

  /** @deprecated Please use `description` instead */
  tip?: React.CSSProperties;
  /** @deprecated Please use `root` instead */
  mask?: React.CSSProperties;
};

export type SpinClassNamesType = SemanticClassNamesType<SpinProps, SpinSemanticClassNames>;

export type SpinStylesType = SemanticStylesType<SpinProps, SpinSemanticStyles>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  /** Whether Spin is spinning */
  spinning?: boolean;
  style?: React.CSSProperties;
  size?: SpinSize;
  /** Customize description content when Spin has children */
  /** @deprecated Please use `description` instead */
  tip?: React.ReactNode;
  description?: React.ReactNode;
  /** Specifies a delay in milliseconds for loading state (prevent flush) */
  delay?: number;
  /** The className of wrapper when Spin has children */
  /** @deprecated Please use `classNames.root` instead */
  wrapperClassName?: string;
  /** React node of the spinning indicator */
  indicator?: SpinIndicator;
  children?: React.ReactNode;
  /** Display a backdrop with the `Spin` component */
  fullscreen?: boolean;
  percent?: number | 'auto';
  classNames?: SpinClassNamesType;
  styles?: SpinStylesType;
}

export type SpinType = React.FC<SpinProps> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};

// Render indicator
let defaultIndicator: React.ReactNode | undefined;

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !Number.isNaN(Number(delay));
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
    description,
    wrapperClassName,
    style,
    children,
    fullscreen = false,
    indicator,
    percent,
    classNames,
    styles,
    ...restProps
  } = props;

  const {
    getPrefixCls,
    direction,
    indicator: contextIndicator,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('spin');

  const prefixCls = getPrefixCls('spin', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

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

  // ======================= Description ======================
  const mergedDescription = description ?? tip;

  // =============== Merged Props for Semantic ================
  const mergedProps: SpinProps = {
    ...props,
    size,
    spinning,
    tip: mergedDescription,
    description: mergedDescription,
    fullscreen,
    children,
    percent: mergedPercent,
  };

  // ========================= Style ==========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SpinClassNamesType,
    SpinStylesType,
    SpinProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  // ======================== Warning =========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Spin');

    warning.deprecated(!tip, 'tip', 'description');
    warning.deprecated(!wrapperClassName, 'wrapperClassName', 'classNames.root');

    warning.deprecated(
      !(mergedClassNames?.tip || mergedStyles?.tip),
      'classNames.tip and styles.tip',
      'classNames.description and styles.description',
    );
    warning.deprecated(
      !(mergedClassNames?.mask || mergedStyles?.mask),
      'classNames.mask and styles.mask',
      'classNames.root and styles.root',
    );
  }

  // ======================= Indicator ========================
  const mergedIndicator = indicator ?? contextIndicator ?? defaultIndicator;

  // ========================= Render =========================
  const hasChildren = typeof children !== 'undefined';
  const isNested = hasChildren || fullscreen;

  const indicatorNode = (
    <>
      <Indicator
        className={clsx(mergedClassNames.indicator)}
        style={mergedStyles.indicator}
        prefixCls={prefixCls}
        indicator={mergedIndicator}
        percent={mergedPercent}
      />
      {mergedDescription && (
        <div
          className={clsx(
            `${prefixCls}-description`,
            mergedClassNames.tip,
            mergedClassNames.description,
          )}
          style={{
            ...mergedStyles.tip,
            ...mergedStyles.description,
          }}
        >
          {mergedDescription}
        </div>
      )}
    </>
  );

  return (
    <div
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-sm`]: size === 'small',
          [`${prefixCls}-lg`]: size === 'large',
          [`${prefixCls}-spinning`]: spinning,
          [`${prefixCls}-rtl`]: direction === 'rtl',
          [`${prefixCls}-fullscreen`]: fullscreen,
        },
        rootClassName,
        mergedClassNames.root,
        fullscreen && mergedClassNames.mask,
        isNested ? wrapperClassName : [`${prefixCls}-section`, mergedClassNames.section],
        contextClassName,
        className,
        hashId,
        cssVarCls,
      )}
      style={{
        ...mergedStyles.root,
        ...(!isNested ? mergedStyles.section : {}),
        ...(fullscreen ? mergedStyles.mask : {}),
        ...contextStyle,
        ...style,
      }}
      aria-live="polite"
      aria-busy={spinning}
      {...restProps}
    >
      {/* Indicator */}
      {spinning &&
        (isNested ? (
          <div
            className={clsx(`${prefixCls}-section`, mergedClassNames.section)}
            style={mergedStyles.section}
          >
            {indicatorNode}
          </div>
        ) : (
          indicatorNode
        ))}

      {/* Children */}
      {hasChildren && (
        <div
          className={clsx(`${prefixCls}-container`, mergedClassNames.container)}
          style={mergedStyles.container}
        >
          {children}
        </div>
      )}
    </div>
  );
};

Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
