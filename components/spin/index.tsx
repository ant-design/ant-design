import * as React from 'react';
import { clsx } from 'clsx';
import { debounce } from 'throttle-debounce';

import { useMergeSemantic, useSemanticRootStyle } from '../_util/hooks/useMergeSemantic';
import type { GenerateSemantic } from '../_util/hooks/useMergeSemantic/semanticType';
import { devUseWarning } from '../_util/warning';
import { useComponentConfig } from '../config-provider/context';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import Indicator from './Indicator';
import useStyle from './style/index';
import usePercent from './usePercent';

export type SpinIndicator = React.ReactElement<HTMLElement>;

export type SpinSemanticType = {
  classNames?: {
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
  styles?: {
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
};

export type SpinSemanticAllType = GenerateSemantic<SpinSemanticType, SpinProps>;

export interface SpinProps {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  /** Whether Spin is spinning */
  spinning?: boolean;
  style?: React.CSSProperties;
  /**
   * Note: `default` is deprecated and will be removed in v7, please use `medium` instead.
   */
  size?: SizeType | 'default';
  /** Customize description content when Spin has children */
  /** @deprecated Please use `description` instead */
  tip?: React.ReactNode;
  description?: React.ReactNode;
  /** Specifies a delay in milliseconds for loading state (prevent flush) */
  delay?: number;
  /** Specifies how long the loading state remains visible after it appears, in milliseconds */
  minDuration?: number;
  /** The className of wrapper when Spin has children */
  /** @deprecated Please use `classNames.root` instead */
  wrapperClassName?: string;
  /** React node of the spinning indicator */
  indicator?: SpinIndicator;
  children?: React.ReactNode;
  /** Display a backdrop with the `Spin` component */
  fullscreen?: boolean;
  percent?: number | 'auto';
  classNames?: SpinSemanticAllType['classNamesAndFn'];
  styles?: SpinSemanticAllType['stylesAndFn'];
}

export interface SpinRef {
  nativeElement: HTMLDivElement;
}

export type SpinType = React.ForwardRefExoticComponent<SpinProps & React.RefAttributes<SpinRef>> & {
  setDefaultIndicator: (indicator: React.ReactNode) => void;
};

// Render indicator
let defaultIndicator: React.ReactNode | undefined;

function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !Number.isNaN(Number(delay));
}

const Spin = React.forwardRef<SpinRef, SpinProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    spinning: customSpinning = true,
    delay = 0,
    minDuration = 0,
    className,
    rootClassName,
    size,
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

  const displayStartRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    if (spinning && displayStartRef.current === null) {
      displayStartRef.current = Date.now();
    }
  }, [spinning]);

  React.useEffect(() => {
    if (!customSpinning) {
      return;
    }

    const showSpinning = debounce(delay, () => {
      setSpinning(true);
    });
    showSpinning();

    return () => {
      showSpinning?.cancel?.();
    };
  }, [delay, customSpinning]);

  React.useEffect(() => {
    if (customSpinning) {
      return;
    }

    const remainingDuration =
      displayStartRef.current === null ? 0 : minDuration - (Date.now() - displayStartRef.current);

    if (remainingDuration > 0) {
      const hideSpinning = setTimeout(() => {
        displayStartRef.current = null;
        setSpinning(false);
      }, remainingDuration);

      return () => clearTimeout(hideSpinning);
    }

    displayStartRef.current = null;
    setSpinning(false);
  }, [customSpinning, minDuration]);

  // ======================= Size ======================
  const mergedSize = useSize((ctx) => size ?? ctx);

  // ======================= Description ======================
  const mergedDescription = description ?? tip;

  // =============== Merged Props for Semantic ================
  const mergedProps: SpinProps = {
    ...props,
    size: mergedSize,
    spinning,
    tip: mergedDescription,
    description: mergedDescription,
    fullscreen,
    children,
    percent: mergedPercent,
  };

  // ========================= Style ==========================
  const contextStyleRoot = useSemanticRootStyle(contextStyle);

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SpinSemanticAllType['classNames'],
    SpinSemanticAllType['styles'],
    SpinProps
  >([contextClassNames, classNames], [contextStyles, contextStyleRoot, styles], {
    props: mergedProps,
  });

  // ======================== Warning =========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Spin');

    warning.deprecated(size !== 'default', 'size="default"', 'size="medium"');
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

  const nativeElementRef = React.useRef<HTMLDivElement>(null);

  React.useImperativeHandle(ref, () => ({
    nativeElement: nativeElementRef.current!,
  }));

  return (
    <div
      ref={nativeElementRef}
      className={clsx(
        prefixCls,
        {
          [`${prefixCls}-sm`]: mergedSize === 'small',
          [`${prefixCls}-lg`]: mergedSize === 'large',
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
}) as SpinType;

Spin.setDefaultIndicator = (indicator: React.ReactNode) => {
  defaultIndicator = indicator;
};

if (process.env.NODE_ENV !== 'production') {
  Spin.displayName = 'Spin';
}

export default Spin;
