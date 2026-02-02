import * as React from 'react';
import DownOutlined from '@ant-design/icons/DownOutlined';
import MinusOutlined from '@ant-design/icons/MinusOutlined';
import PlusOutlined from '@ant-design/icons/PlusOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import RcInputNumber from '@rc-component/input-number';
import type {
  InputNumberProps as RcInputNumberProps,
  InputNumberRef as RcInputNumberRef,
  ValueType,
} from '@rc-component/input-number';
import { clsx } from 'clsx';

import ContextIsolator from '../_util/ContextIsolator';
import { useMergeSemantic } from '../_util/hooks';
import type { GenerateSemantic } from '../_util/hooks/semanticType';
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

export type InputNumberSemanticType = {
  classNames?: {
    root?: string;
    prefix?: string;
    suffix?: string;
    input?: string;
    actions?: string;
  };
  styles?: {
    root?: React.CSSProperties;
    prefix?: React.CSSProperties;
    suffix?: React.CSSProperties;
    input?: React.CSSProperties;
    actions?: React.CSSProperties;
  };
};

export type InputNumberSemanticAllType = GenerateSemantic<
  InputNumberSemanticType,
  InputNumberProps
>;

export interface InputNumberProps<T extends ValueType = ValueType>
  extends Omit<RcInputNumberProps<T>, 'prefix' | 'size' | 'controls' | 'classNames' | 'styles'> {
  prefixCls?: string;
  rootClassName?: string;
  classNames?:
    | InputNumberSemanticAllType['classNames']
    | InputNumberSemanticAllType['classNamesFn'];
  styles?: InputNumberSemanticAllType['styles'] | InputNumberSemanticAllType['stylesFn'];
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
      ...others
    } = props;

    const {
      direction,
      className: contextClassName,
      style: contextStyle,
      styles: contextStyles,
      classNames: contextClassNames,
    } = useComponentConfig('inputNumber');

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    // controls && !mergedDisabled && !readOnly;
    const mergedControls = React.useMemo(() => {
      if (!controls || mergedDisabled || readOnly) {
        return false;
      }
      return controls;
    }, [controls, mergedDisabled, readOnly]);

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

    const [variant, enableVariantCls] = useVariant('inputNumber', customVariant, bordered);

    const suffixNode = hasFeedback && <>{feedbackIcon}</>;

    // =========== Merged Props for Semantic ==========
    const mergedProps: InputNumberProps = {
      ...props,
      size: mergedSize,
      disabled: mergedDisabled,
      controls: mergedControls,
    };

    const [mergedClassNames, mergedStyles] = useMergeSemantic(
      [contextClassNames, classNames],
      [contextStyles, styles],
      {
        props: mergedProps,
      },
    );

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
        suffix={suffixNode || suffix}
        classNames={mergedClassNames}
        styles={mergedStyles}
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
