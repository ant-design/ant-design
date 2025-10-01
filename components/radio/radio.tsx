import * as React from 'react';
import RcCheckbox from '@rc-component/checkbox';
import { composeRef } from '@rc-component/util/lib/ref';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { TARGET_CLS } from '../_util/wave/interface';
import useBubbleLock from '../checkbox/useBubbleLock';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useCSSVarCls from '../config-provider/hooks/useCSSVarCls';
import { FormItemInputContext } from '../form/context';
import RadioGroupContext, { RadioOptionTypeContext } from './context';
import type { RadioChangeEvent, RadioProps, RadioRef } from './interface';
import useStyle from './style';

const InternalRadio: React.ForwardRefRenderFunction<RadioRef, RadioProps> = (props, ref) => {
  const groupContext = React.useContext(RadioGroupContext);
  const radioOptionTypeContext = React.useContext(RadioOptionTypeContext);

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('radio');
  const innerRef = React.useRef<RadioRef>(null);
  const mergedRef = composeRef(ref, innerRef);
  const { isFormItemInput } = React.useContext(FormItemInputContext);

  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Radio');

    warning(!('optionType' in props), 'usage', '`optionType` is only support in Radio.Group.');
  }

  const onChange = (e: RadioChangeEvent) => {
    props.onChange?.(e);
    groupContext?.onChange?.(e);
  };

  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style,
    title,
    classNames,
    styles,
    ...restProps
  } = props;
  const radioPrefixCls = getPrefixCls('radio', customizePrefixCls);

  const isButtonType = (groupContext?.optionType || radioOptionTypeContext) === 'button';
  const prefixCls = isButtonType ? `${radioPrefixCls}-button` : radioPrefixCls;

  // Style
  const rootCls = useCSSVarCls(radioPrefixCls);
  const [hashId, cssVarCls] = useStyle(radioPrefixCls, rootCls);

  const radioProps: RadioProps = { ...restProps };

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);

  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = radioProps.disabled ?? groupContext.disabled;
  }

  radioProps.disabled = radioProps.disabled ?? disabled;

  // =========== Merged Props for Semantic ===========
  const mergedProps: RadioProps = {
    ...props,
    ...radioProps,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SemanticClassNamesType<RadioProps, 'root' | 'icon' | 'label'>,
    SemanticStylesType<RadioProps, 'root' | 'icon' | 'label'>,
    RadioProps
  >([contextClassNames, classNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });
  const wrapperClassString = clsx(
    `${prefixCls}-wrapper`,
    {
      [`${prefixCls}-wrapper-checked`]: radioProps.checked,
      [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
      [`${prefixCls}-wrapper-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
      [`${prefixCls}-wrapper-block`]: !!groupContext?.block,
    },
    contextClassName,
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
    rootCls,
  );

  // ============================ Event Lock ============================
  const [onLabelClick, onInputClick] = useBubbleLock(radioProps.onClick);

  // ============================== Render ==============================
  return (
    <Wave component="Radio" disabled={radioProps.disabled}>
      <label
        className={wrapperClassString}
        style={{ ...mergedStyles.root, ...contextStyle, ...style }}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        title={title}
        onClick={onLabelClick}
      >
        {/* @ts-ignore */}
        <RcCheckbox
          {...radioProps}
          className={clsx(mergedClassNames.icon, { [TARGET_CLS]: !isButtonType })}
          style={mergedStyles.icon}
          type="radio"
          prefixCls={prefixCls}
          ref={mergedRef}
          onClick={onInputClick}
        />
        {children !== undefined ? (
          <span
            className={clsx(`${prefixCls}-label`, mergedClassNames.label)}
            style={mergedStyles.label}
          >
            {children}
          </span>
        ) : null}
      </label>
    </Wave>
  );
};

const Radio = React.forwardRef<RadioRef, RadioProps>(InternalRadio);

if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}

export default Radio;
