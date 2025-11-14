import * as React from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
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
import { useCompactItemContext } from '../space/Compact';
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
  extends Omit<RcInputNumberProps<T>, 'prefix' | 'size' | 'controls' | 'classNames' | 'styles'> {
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
}

const InputNumber = React.forwardRef<RcInputNumberRef, InputNumberProps>((props, ref) => {
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

  const inputRef = React.useRef<RcInputNumberRef>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const {
    rootClassName,
    size: customizeSize,
    disabled: customDisabled,
    prefixCls: customizePrefixCls,
    addonBefore,
    addonAfter,
    prefix,
    suffix,
    bordered,
    readOnly,
    status: customStatus,
    controls,
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
    getPrefixCls,
    className: contextClassName,
    style: contextStyle,
    styles: contextStyles,
    classNames: contextClassNames,
  } = useComponentConfig('inputNumber');

  const prefixCls = getPrefixCls('input-number', customizePrefixCls);

  // Style
  const rootCls = useCSSVarCls(prefixCls);
  const [hashId, cssVarCls] = useStyle(prefixCls, rootCls);

  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);
  let upIcon: React.ReactNode = mode === 'spinner' ? <PlusOutlined /> : <UpOutlined />;
  let downIcon: React.ReactNode = mode === 'spinner' ? <MinusOutlined /> : <DownOutlined />;
  const controlsTemp = typeof controls === 'boolean' ? controls : undefined;

  if (typeof controls === 'object') {
    upIcon = controls.upIcon || upIcon;
    downIcon = controls.downIcon || downIcon;
  }

  upIcon = <span className={`${prefixCls}-handler-up-inner`}>{upIcon}</span>;
  downIcon = <span className={`${prefixCls}-handler-down-inner`}>{downIcon}</span>;

  const {
    hasFeedback,
    status: contextStatus,
    isFormItemInput,
    feedbackIcon,
  } = React.useContext(FormItemInputContext);
  const mergedStatus = getMergedStatus(contextStatus, customStatus);

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
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    InputNumberClassNamesType,
    InputNumberStylesType,
    InputNumberProps
  >([contextClassNames, classNames], [contextStyles, styles], {
    props: mergedProps,
  });

  const wrapperClassName = `${prefixCls}-group`;

  return (
    <RcInputNumber
      ref={inputRef}
      mode={mode}
      disabled={mergedDisabled}
      className={clsx(
        cssVarCls,
        rootCls,
        className,
        rootClassName,
        mergedClassNames.root,
        contextClassName,
        compactItemClassnames,
      )}
      style={{ ...mergedStyles.root, ...contextStyle, ...style }}
      upHandler={upIcon}
      downHandler={downIcon}
      prefixCls={prefixCls}
      readOnly={readOnly}
      controls={controlsTemp}
      prefix={prefix}
      suffix={suffixNode || suffix}
      addonBefore={
        addonBefore && (
          <ContextIsolator form space>
            {addonBefore}
          </ContextIsolator>
        )
      }
      addonAfter={
        addonAfter && (
          <ContextIsolator form space>
            {addonAfter}
          </ContextIsolator>
        )
      }
      classNames={{
        ...mergedClassNames,
        input: clsx(
          {
            [`${prefixCls}-lg`]: mergedSize === 'large',
            [`${prefixCls}-sm`]: mergedSize === 'small',
            [`${prefixCls}-rtl`]: direction === 'rtl',
            [`${prefixCls}-in-form-item`]: isFormItemInput,
          },
          hashId,
          mergedClassNames.input,
        ),
        variant: clsx(
          { [`${prefixCls}-${variant}`]: enableVariantCls },
          getStatusClassNames(prefixCls, mergedStatus, hasFeedback),
        ),
        affixWrapper: clsx(
          {
            [`${prefixCls}-affix-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-affix-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-affix-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-affix-wrapper-without-controls`]:
              controls === false || mergedDisabled || readOnly,
          },
          hashId,
        ),
        wrapper: clsx({ [`${wrapperClassName}-rtl`]: direction === 'rtl' }, hashId),
        groupWrapper: clsx(
          {
            [`${prefixCls}-group-wrapper-sm`]: mergedSize === 'small',
            [`${prefixCls}-group-wrapper-lg`]: mergedSize === 'large',
            [`${prefixCls}-group-wrapper-rtl`]: direction === 'rtl',
            [`${prefixCls}-group-wrapper-${variant}`]: enableVariantCls,
          },
          getStatusClassNames(`${prefixCls}-group-wrapper`, mergedStatus, hasFeedback),
          hashId,
        ),
      }}
      styles={mergedStyles}
      {...others}
    />
  );
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
  TypedInputNumber.displayName = 'InputNumber';
}

TypedInputNumber._InternalPanelDoNotUseOrYouWillBeFired = PureInputNumber;

export default TypedInputNumber;
