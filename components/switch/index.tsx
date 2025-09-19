import * as React from 'react';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import RcSwitch from '@rc-component/switch';
import type { SwitchChangeEventHandler, SwitchClickEventHandler } from '@rc-component/switch';
import useMergedState from '@rc-component/util/lib/hooks/useMergedState';
import cls from 'classnames';

import Wave from '../_util/wave';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import useStyle from './style';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';

export type SwitchSize = 'small' | 'default';
export type { SwitchChangeEventHandler, SwitchClickEventHandler };

type SemanticName = 'root' | 'content';

export type SwitchClassNamesType = SemanticClassNamesType<SwitchProps, SemanticName>;
export type SwitchStylesType = SemanticStylesType<SwitchProps, SemanticName>;
export interface SwitchProps {
  prefixCls?: string;
  size?: SwitchSize;
  className?: string;
  rootClassName?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  /**
   * Alias for `checked`.
   * @since 5.12.0
   */
  value?: boolean;
  /**
   * Alias for `defaultChecked`.
   * @since 5.12.0
   */
  defaultValue?: boolean;
  onChange?: SwitchChangeEventHandler;
  onClick?: SwitchClickEventHandler;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  title?: string;
  tabIndex?: number;
  id?: string;
  classNames?: SwitchClassNamesType;
  styles?: SwitchStylesType;
}

const InternalSwitch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    size: customizeSize,
    disabled: customDisabled,
    loading,
    className,
    rootClassName,
    style,
    checked: checkedProp,
    value,
    defaultChecked: defaultCheckedProp,
    defaultValue,
    onChange,
    styles,
    classNames: switchClassNames,
    ...restProps
  } = props;

  const [checked, setChecked] = useMergedState<boolean>(false, {
    value: checkedProp ?? value,
    defaultValue: defaultCheckedProp ?? defaultValue,
  });

  const {
    getPrefixCls,
    direction,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('switch');

  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = (customDisabled ?? disabled) || loading;

  const prefixCls = getPrefixCls('switch', customizePrefixCls);

  const loadingIcon = (
    <div className={`${prefixCls}-handle`}>
      {loading && <LoadingOutlined className={`${prefixCls}-loading-icon`} />}
    </div>
  );

  // Style
  const [hashId, cssVarCls] = useStyle(prefixCls);

  const mergedSize = useSize(customizeSize);

  const mergedProps = {
    ...props,
    size: mergedSize,
    disabled: mergedDisabled,
  };

  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    SwitchClassNamesType,
    SwitchStylesType,
    SwitchProps
  >([contextClassNames, switchClassNames], [contextStyles, styles], undefined, {
    props: mergedProps,
  });

  const classes = cls(
    contextClassName,
    {
      [`${prefixCls}-small`]: mergedSize === 'small',
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
    rootClassName,
    mergedClassNames.root,
    hashId,
    cssVarCls,
  );

  const mergedStyle: React.CSSProperties = {
    ...mergedStyles?.root,
    ...contextStyle,
    ...style,
  };

  const changeHandler: SwitchChangeEventHandler = (...args) => {
    setChecked(args[0]);
    onChange?.(...args);
  };

  return (
    <Wave component="Switch" disabled={mergedDisabled}>
      <RcSwitch
        {...restProps}
        classNames={{ content: mergedClassNames.content }}
        styles={{ content: mergedStyles.content }}
        checked={checked}
        onChange={changeHandler}
        prefixCls={prefixCls}
        className={classes}
        style={mergedStyle}
        disabled={mergedDisabled}
        ref={ref}
        loadingIcon={loadingIcon}
      />
    </Wave>
  );
});

type CompoundedComponent = typeof InternalSwitch & {
  /** @internal */
  __ANT_SWITCH: boolean;
};

const Switch = InternalSwitch as CompoundedComponent;

Switch.__ANT_SWITCH = true;

if (process.env.NODE_ENV !== 'production') {
  Switch.displayName = 'Switch';
}

export default Switch;
