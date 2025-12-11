import * as React from 'react';
import { CloseCircleFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import RcInputNumber from '@rc-component/input-number';
import type {
  InputNumberProps as RcInputNumberProps,
  InputNumberRef as RcInputNumberRef,
  ValueType,
} from '@rc-component/input-number';
import { clsx } from 'clsx';

import ContextIsolator from '../_util/ContextIsolator';
import getAllowClear from '../_util/getAllowClear';
import { useMergeSemantic } from '../_util/hooks';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import type { InputStatus } from '../_util/statusUtils';
import { getMergedStatus, getStatusClassNames } from '../_util/statusUtils';
import { devUseWarning } from '../_util/warning';
import ConfigProvider from '../config-provider';
import type { Variant } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { FormItemInputContext } from '../form/context';
import useVariant from '../form/hooks/useVariants';
import SpaceAddon from '../space/Addon';
import Compact, { useCompactItemContext } from '../space/Compact';
import useStyle from './style';

type SemanticName = 'root' | 'prefix' | 'suffix' | 'input' | 'actions';

export type InputNumberClassNamesType<T extends ValueType = ValueType> = SemanticClassNamesType<
  InputNumberProps<T>,
  SemanticName
>;
export type InputNumberStylesType<T extends ValueType = ValueType> = SemanticStylesType<
  InputNumberProps<T>,
  SemanticName
>;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<
    RcInputNumberProps<T>,
    'prefix' | 'size' | 'controls' | 'classNames' | 'styles' | 'allowClear'
  > {
  prefixCls?: string;
  rootClassName?: string;
  classNames?: InputNumberClassNamesType;
  styles?: InputNumberStylesType;
  /**
   * @deprecated Use `Space.Compact` instead.
   *
   * @example
   * ```tsx
   * import { Space, InputNumber } from 'antd';
   *
   * <Space.Compact>
   *   {addon}
   *   <InputNumber defaultValue={1} />
   * </Space.Compact>
   * ```
   */
  addonBefore?: React.ReactNode;
  /**
   * @deprecated Use `Space.Compact` instead.
   *
   * @example
   * ```tsx
   * import { Space, InputNumber } from 'antd';
   *
   * <Space.Compact>
   *   <InputNumber defaultValue={1} />
   *   {addon}
   * </Space.Compact>
   * ```
   */
  addonAfter?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: SizeType;
  disabled?: boolean;
  /** @deprecated Use `variant` instead. */
  bordered?: boolean;
  status?: InputStatus;
  controls?:
    | boolean
    | {
        upIcon?: React.ReactNode;
        downIcon?: React.ReactNode;
      };
  /**
   * @since 5.13.0
   * @default "outlined"
   */
  variant?: Variant;
  /**
   * If allow to remove input content with clear icon
   */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
}

type InternalInputNumberProps = InputNumberProps & {
  prefixCls: string;
};

const InternalInputNumber = React.forwardRef<RcInputNumberRef, InternalInputNumberProps>(
  (props, ref) => {
    const inputRef = React.useRef<RcInputNumberRef>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const {
      rootClassName,
      size: customizeSize,
      disabled: customDisabled,
      prefixCls,
      addonBefore: _addonBefore,
      addonAfter: _addonAfter,
      prefix,
      suffix,
      bordered,
      readOnly,
      status,
      controls = true,
      variant: customVariant,
      className,
      style,
      classNames,
      styles,
      mode,
      allowClear,
      value,
      defaultValue,
      onChange,
      ...others
    } = props;

    // Track the current value for uncontrolled components
    const [currentValue, setCurrentValue] = React.useState<ValueType | null | undefined>(
      defaultValue,
    );
    const isControlled = value !== undefined;

    const {
      direction,
      className: contextClassName,
      style: contextStyle,
      styles: contextStyles,
      classNames: contextClassNames,
    } = useComponentConfig('inputNumber');

    //controls && !props.disabled && !props.readOnly;
    const mergedControls = React.useMemo(() => {
      if (!controls || props.disabled || props.readOnly) {
        return false;
      }

      return controls;
    }, [controls, props.disabled, props.readOnly]);

    const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
    let upIcon: React.ReactNode = mode === 'spinner' ? <PlusOutlined /> : <UpOutlined />;
    let downIcon: React.ReactNode = mode === 'spinner' ? <MinusOutlined /> : <DownOutlined />;
    const controlsTemp = typeof mergedControls === 'boolean' ? mergedControls : undefined;

    if (typeof mergedControls === 'object') {
      upIcon = mergedControls.upIcon || upIcon;
      downIcon = mergedControls.downIcon || downIcon;
    }

    const { hasFeedback, isFormItemInput, feedbackIcon } = React.useContext(FormItemInputContext);

    const mergedSize = useSize((ctx) => customizeSize ?? compactSize ?? ctx);

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const [variant, enableVariantCls] = useVariant('inputNumber', customVariant, bordered);

    const suffixNode = hasFeedback && <>{feedbackIcon}</>;

    // =========== Merged Props for Semantic ==========
    const mergedProps: InputNumberProps = {
      ...props,
      size: mergedSize,
      disabled: mergedDisabled,
      controls: mergedControls,
    };

    const [mergedClassNames, mergedStyles] = useMergeSemantic<
      InputNumberClassNamesType,
      InputNumberStylesType,
      InputNumberProps
    >([contextClassNames, classNames], [contextStyles, styles], {
      props: mergedProps,
    });

    // ===================== Allow Clear =====================
    const mergedAllowClear = getAllowClear(allowClear);

    // Handle clear event
    const handleReset = (e: React.MouseEvent<HTMLElement>) => {
      // Call onChange with null to clear the value
      const newValue = null;
      props.onChange?.(newValue);

      // Update local state for uncontrolled components
      if (!isControlled) {
        setCurrentValue(newValue);
      }

      // Focus the input element
      if (inputRef.current?.nativeElement) {
        const inputElement = inputRef.current.nativeElement.querySelector('input');
        inputElement?.focus();
      }

      e.preventDefault();
    };

    // Wrap onChange to update local state for uncontrolled components
    const handleChange: typeof onChange = (newValue) => {
      props.onChange?.(newValue);

      // Update local state for uncontrolled components
      if (!isControlled) {
        setCurrentValue(newValue);
      }
    };

    // Combine suffix with clear icon if allowClear is enabled
    let combinedSuffix = suffixNode || suffix;
    // Check if there's a value to determine if we should show the clear icon
    // For controlled components, check props.value
    // For uncontrolled components, check the current value state
    const hasValue = isControlled
      ? props.value !== null && props.value !== undefined && props.value !== ''
      : currentValue !== null && currentValue !== undefined && currentValue !== '';

    // Only show clear icon when allowClear is enabled, there's a value (for controlled) or always (for uncontrolled),
    // and the component is not disabled or readOnly
    if (mergedAllowClear && hasValue && !props.disabled && !props.readOnly) {
      // Create clear icon with proper event handling
      const clearIcon = (
        <span
          className={`${prefixCls}-clear-icon`}
          onClick={handleReset}
          onMouseDown={(e) => e.preventDefault()}
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
        >
          {typeof mergedAllowClear === 'object' ? (
            mergedAllowClear.clearIcon
          ) : (
            <CloseCircleFilled />
          )}
        </span>
      );

      combinedSuffix = (
        <>
          {combinedSuffix}
          {clearIcon}
        </>
      );
    }

    return (
      <RcInputNumber
        ref={inputRef}
        mode={mode}
        disabled={mergedDisabled}
        className={clsx(
          className,
          rootClassName,
          mergedClassNames.root,
          contextClassName,
          compactItemClassnames,

          getStatusClassNames(prefixCls, status, hasFeedback),
          {
            [`${prefixCls}-${variant}`]: enableVariantCls,
            [`${prefixCls}-lg`]: mergedSize === 'large',
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-rtl`]: direction === 'rtl',
            [`${prefixCls}-in-form-item`]: isFormItemInput,
            [`${prefixCls}-without-controls`]: !mergedControls,
          },
        )}
        style={{ ...mergedStyles.root, ...contextStyle, ...style }}
        upHandler={upIcon}
        downHandler={downIcon}
        prefixCls={prefixCls}
        readOnly={readOnly}
        controls={controlsTemp}
        prefix={prefix}
        suffix={combinedSuffix}
        classNames={mergedClassNames}
        styles={mergedStyles}
        onChange={handleChange}
        {...others}
      />
    );
  },
);

// ===================================================================
// ==                          InputNumber                          ==
// ===================================================================
const InputNumber = React.forwardRef<RcInputNumberRef, InputNumberProps>((props, ref) => {
  const {
    addonBefore,
    addonAfter,
    prefixCls: customizePrefixCls,
    className,
    status: customStatus,
    rootClassName,
    ...rest
  } = props;

  const { getPrefixCls } = useComponentConfig('inputNumber');
  const prefixCls = getPrefixCls('input-number', customizePrefixCls);

  const { status: contextStatus } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const hasLegacyAddon = addonBefore || addonAfter;

  // ======================= Warn =======================
  if (process.env.NODE_ENV !== 'production') {
    const typeWarning = devUseWarning('InputNumber');
    [
      ['bordered', 'variant'],
      ['addonAfter', 'Space.Compact'],
      ['addonBefore', 'Space.Compact'],
    ].forEach(([prop, newProp]) => {
      typeWarning.deprecated(!(prop in props), prop, newProp);
    });
    typeWarning(
      !(props.type === 'number' && props.changeOnWheel),
      'usage',
      'When `type=number` is used together with `changeOnWheel`, changeOnWheel may not work properly. Please delete `type=number` if it is not necessary.',
    );
  }

  // ====================== Render ======================
  const inputNumberNode = (
    <InternalInputNumber
      ref={ref}
      {...rest}
      prefixCls={prefixCls}
      status={mergedStatus}
      className={clsx(cssVarCls, rootCls, hashId, className)}
      rootClassName={!hasLegacyAddon ? rootClassName : undefined}
    />
  );

  if (hasLegacyAddon) {
    const renderAddon = (node?: React.ReactNode) => {
      if (!node) {
        return null;
      }

      return (
        <SpaceAddon
          className={clsx(`${prefixCls}-addon`, cssVarCls, hashId)}
          variant={props.variant}
          disabled={props.disabled}
          status={mergedStatus}
        >
          <ContextIsolator form>{node}</ContextIsolator>
        </SpaceAddon>
      );
    };

    const addonBeforeNode = renderAddon(addonBefore);

    const addonAfterNode = renderAddon(addonAfter);

    return (
      <Compact rootClassName={rootClassName}>
        {addonBeforeNode}
        {inputNumberNode}
        {addonAfterNode}
      </Compact>
    );
  }

  return inputNumberNode;
});

const TypedInputNumber = InputNumber as unknown as (<T extends ValueType = ValueType>(
  props: React.PropsWithChildren<InputNumberProps<T>> & React.RefAttributes<RcInputNumberRef>,
) => React.ReactElement) & {
  displayName?: string;
  _InternalPanelDoNotUseOrYouWillBeFired: typeof PureInputNumber;
};

/** @private Internal Component. Do not use in your production. */
const PureInputNumber: React.FC<InputNumberProps> = (props) => (
  <ConfigProvider theme={{ components: { InputNumber: { handleVisible: true } } }}>
    <InputNumber {...props} />
  </ConfigProvider>
);

if (process.env.NODE_ENV !== 'production') {
  InternalInputNumber.displayName = 'InternalInputNumber';
  TypedInputNumber.displayName = 'InputNumber';
}

TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;

export default TypedInputNumber;
