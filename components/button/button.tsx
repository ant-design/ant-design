import React, { Children, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { omit, useComposeRef } from '@rc-component/util';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import { clsx } from 'clsx';

import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import type { SemanticClassNamesType, SemanticStylesType } from '../_util/hooks/useMergeSemantic';
import isValidNode from '../_util/isValidNode';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext, useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import Group, { GroupSizeContext } from './button-group';
import type {
  ButtonColorType,
  ButtonHTMLType,
  ButtonShape,
  ButtonType,
  ButtonVariantType,
} from './buttonHelpers';
import { isTwoCNChar, isUnBorderedButtonVariant, spaceChildren } from './buttonHelpers';
import DefaultLoadingIcon from './DefaultLoadingIcon';
import IconWrapper from './IconWrapper';
import useStyle from './style';
import Compact from './style/compact';

export type LegacyButtonType = ButtonType | 'danger';

export type ButtonSemanticName = 'root' | 'icon' | 'content';

export type ButtonClassNamesType = SemanticClassNamesType<BaseButtonProps, ButtonSemanticName>;

export type ButtonStylesType = SemanticStylesType<BaseButtonProps, ButtonSemanticName>;

export interface BaseButtonProps {
  type?: ButtonType;
  color?: ButtonColorType;
  variant?: ButtonVariantType;
  icon?: React.ReactNode;
  /** @deprecated please use `iconPlacement` instead */
  iconPosition?: 'start' | 'end';
  iconPlacement?: 'start' | 'end';
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number; icon?: React.ReactNode };
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
  [key: `data-${string}`]: string;
  classNames?: ButtonClassNamesType;
  styles?: ButtonStylesType;
  // FloatButton reuse the Button as sub component,
  // But this should not consume context semantic classNames and styles.
  // Use props here to avoid context solution cost for normal usage.
  /** @private Only for internal usage. Do not use in your production */
  _skipSemantic?: boolean;
}

type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>,
  'type' | 'color'
>;

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
  href?: string;
  htmlType?: ButtonHTMLType;
  autoInsertSpace?: boolean;
}

type LoadingConfigType = {
  loading: boolean;
  delay: number;
};

function getLoadingConfig(loading: BaseButtonProps['loading']): LoadingConfigType {
  if (typeof loading === 'object' && loading) {
    let delay = loading?.delay;
    delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
    return {
      loading: delay <= 0,
      delay,
    };
  }

  return {
    loading: !!loading,
    delay: 0,
  };
}

type ColorVariantPairType = [color?: ButtonColorType, variant?: ButtonVariantType];

const ButtonTypeMap: Partial<Record<ButtonType, ColorVariantPairType>> = {
  default: ['default', 'outlined'],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  // `link` is not a real color but we should compatible with it
  link: ['link' as any, 'link'],
  text: ['default', 'text'],
};

const InternalCompoundedButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    _skipSemantic,

    loading = false,
    prefixCls: customizePrefixCls,
    color,
    variant,
    type,
    danger = false,
    shape: customizeShape,
    size: customizeSize,
    disabled: customDisabled,
    className,
    rootClassName,
    children,
    icon,
    iconPosition,
    iconPlacement,
    ghost = false,
    block = false,
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = 'button',
    classNames,
    styles,
    style,
    autoInsertSpace,
    autoFocus,
    ...rest
  } = props;

  // https://github.com/ant-design/ant-design/issues/47605
  // Compatible with original `type` behavior
  const mergedType = type || 'default';
  const { button } = React.useContext(ConfigContext);

  const shape = customizeShape || button?.shape || 'default';

  const [parsedColor, parsedVariant] = useMemo<ColorVariantPairType>(() => {
    // >>>>> Local
    // Color & Variant
    if (color && variant) {
      return [color, variant];
    }

    // Sugar syntax
    if (type || danger) {
      const colorVariantPair = ButtonTypeMap[mergedType] || [];
      if (danger) {
        return ['danger', colorVariantPair[1]];
      }
      return colorVariantPair;
    }

    // >>> Context fallback
    if (button?.color && button?.variant) {
      return [button.color, button.variant];
    }

    return ['default', 'outlined'];
  }, [type, color, variant, danger, button?.variant, button?.color]);

  const [mergedColor, mergedVariant] = useMemo<ColorVariantPairType>(() => {
    if (ghost && parsedVariant === 'solid') {
      return [parsedColor, 'outlined'];
    }
    return [parsedColor, parsedVariant];
  }, [parsedColor, parsedVariant, ghost]);

  const isDanger = mergedColor === 'danger';
  const mergedColorText = isDanger ? 'dangerous' : mergedColor;

  const {
    getPrefixCls,
    direction,
    autoInsertSpace: contextAutoInsertSpace,
    className: contextClassName,
    style: contextStyle,
    classNames: contextClassNames,
    styles: contextStyles,
  } = useComponentConfig('button');

  const mergedInsertSpace = autoInsertSpace ?? contextAutoInsertSpace ?? true;

  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  const [hashId, cssVarCls] = useStyle(prefixCls);

  const disabled = useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const groupSize = useContext(GroupSizeContext);

  const loadingOrDelay = useMemo<LoadingConfigType>(() => getLoadingConfig(loading), [loading]);

  const [innerLoading, setLoading] = useState<boolean>(loadingOrDelay.loading);

  const [hasTwoCNChar, setHasTwoCNChar] = useState<boolean>(false);

  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const mergedRef = useComposeRef(ref, buttonRef);

  const needInserted =
    Children.count(children) === 1 && !icon && !isUnBorderedButtonVariant(mergedVariant);

  // ========================= Mount ==========================
  // Record for mount status.
  // This will help to no to show the animation of loading on the first mount.
  const isMountRef = useRef(true);
  React.useEffect(() => {
    isMountRef.current = false;
    return () => {
      isMountRef.current = true;
    };
  }, []);

  // ========================= Effect =========================
  // Loading. Should use `useLayoutEffect` to avoid low perf multiple click issue.
  // https://github.com/ant-design/ant-design/issues/51325
  useLayoutEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout> | null = null;
    if (loadingOrDelay.delay > 0) {
      delayTimer = setTimeout(() => {
        delayTimer = null;
        setLoading(true);
      }, loadingOrDelay.delay);
    } else {
      setLoading(loadingOrDelay.loading);
    }

    function cleanupTimer() {
      if (delayTimer) {
        clearTimeout(delayTimer);
        delayTimer = null;
      }
    }

    return cleanupTimer;
  }, [loadingOrDelay.delay, loadingOrDelay.loading]);

  // Two chinese characters check
  useEffect(() => {
    // FIXME: for HOC usage like <FormatMessage />
    if (!buttonRef.current || !mergedInsertSpace) {
      return;
    }
    const buttonText = buttonRef.current.textContent || '';
    if (needInserted && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  });

  // Auto focus
  useEffect(() => {
    if (autoFocus && buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  // ========================= Events =========================
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
      // FIXME: https://github.com/ant-design/ant-design/issues/30207
      if (innerLoading || mergedDisabled) {
        e.preventDefault();
        return;
      }

      props.onClick?.(
        'href' in props
          ? (e as React.MouseEvent<HTMLAnchorElement, MouseEvent>)
          : (e as React.MouseEvent<HTMLButtonElement, MouseEvent>),
      );
    },
    [props.onClick, innerLoading, mergedDisabled],
  );

  // ========================== Warn ==========================
  if (process.env.NODE_ENV !== 'production') {
    const warning = devUseWarning('Button');

    warning(
      !(typeof icon === 'string' && icon.length > 2),
      'breaking',
      `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
    );

    warning(
      !(ghost && isUnBorderedButtonVariant(mergedVariant)),
      'usage',
      "`link` or `text` button can't be a `ghost` button.",
    );

    warning.deprecated(!iconPosition, 'iconPosition', 'iconPlacement');
  }

  // ========================== Size ==========================
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };

  const sizeFullName = useSize((ctxSize) => customizeSize ?? compactSize ?? groupSize ?? ctxSize);

  const sizeCls = sizeFullName ? (sizeClassNameMap[sizeFullName] ?? '') : '';

  const iconType = innerLoading ? 'loading' : icon;

  const mergedIconPlacement = iconPlacement ?? iconPosition ?? 'start';

  const linkButtonRestProps = omit(rest as ButtonProps & { navigate: any }, ['navigate']);

  // =========== Merged Props for Semantic ===========
  const mergedProps: ButtonProps = {
    ...props,
    type: mergedType,
    color: mergedColor,
    variant: mergedVariant,
    danger: isDanger,
    shape,
    size: sizeFullName,
    disabled: mergedDisabled,
    loading: innerLoading,
    iconPlacement: mergedIconPlacement,
  };

  // ========================= Style ==========================
  const [mergedClassNames, mergedStyles] = useMergeSemantic<
    ButtonClassNamesType,
    ButtonStylesType,
    ButtonProps
  >(
    [_skipSemantic ? undefined : contextClassNames, classNames],
    [_skipSemantic ? undefined : contextStyles, styles],
    { props: mergedProps },
  );

  // ========================= Render =========================
  const classes = clsx(
    prefixCls,
    hashId,
    cssVarCls,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape !== 'square' && shape,
      // Compatible with versions earlier than 5.21.0
      [`${prefixCls}-${mergedType}`]: mergedType,
      [`${prefixCls}-dangerous`]: danger,

      [`${prefixCls}-color-${mergedColorText}`]: mergedColorText,
      [`${prefixCls}-variant-${mergedVariant}`]: mergedVariant,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonVariant(mergedVariant),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && mergedInsertSpace && !innerLoading,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-icon-end`]: mergedIconPlacement === 'end',
    },
    compactItemClassnames,
    className,
    rootClassName,
    contextClassName,
    mergedClassNames.root,
  );

  const fullStyle: React.CSSProperties = {
    ...mergedStyles.root,
    ...contextStyle,
    ...style,
  };

  const iconSharedProps = {
    className: mergedClassNames.icon,
    style: mergedStyles.icon,
  };

  const iconNode =
    icon && !innerLoading ? (
      <IconWrapper prefixCls={prefixCls} {...iconSharedProps}>
        {icon}
      </IconWrapper>
    ) : loading && typeof loading === 'object' && loading.icon ? (
      <IconWrapper prefixCls={prefixCls} {...iconSharedProps}>
        {loading.icon}
      </IconWrapper>
    ) : (
      <DefaultLoadingIcon
        existIcon={!!icon}
        prefixCls={prefixCls}
        loading={innerLoading}
        mount={isMountRef.current}
        {...iconSharedProps}
      />
    );

  const contentNode = isValidNode(children)
    ? spaceChildren(
        children,
        needInserted && mergedInsertSpace,
        mergedStyles.content,
        mergedClassNames.content,
      )
    : null;

  if (linkButtonRestProps.href !== undefined) {
    return (
      <a
        {...linkButtonRestProps}
        className={clsx(classes, { [`${prefixCls}-disabled`]: mergedDisabled })}
        href={mergedDisabled ? undefined : linkButtonRestProps.href}
        style={fullStyle}
        onClick={handleClick}
        ref={mergedRef as React.Ref<HTMLAnchorElement>}
        tabIndex={mergedDisabled ? -1 : 0}
        aria-disabled={mergedDisabled}
      >
        {iconNode}
        {contentNode}
      </a>
    );
  }

  let buttonNode = (
    <button
      {...rest}
      type={htmlType}
      className={classes}
      style={fullStyle}
      onClick={handleClick}
      disabled={mergedDisabled}
      ref={mergedRef as React.Ref<HTMLButtonElement>}
    >
      {iconNode}
      {contentNode}
      {compactItemClassnames && <Compact prefixCls={prefixCls} />}
    </button>
  );

  if (!isUnBorderedButtonVariant(mergedVariant)) {
    buttonNode = (
      <Wave component="Button" disabled={innerLoading}>
        {buttonNode}
      </Wave>
    );
  }
  return buttonNode;
});

type CompoundedComponent = typeof InternalCompoundedButton & {
  /** @deprecated Please use `Space.Compact` */
  Group: typeof Group;
  /** @internal */
  __ANT_BUTTON: boolean;
};

const Button = InternalCompoundedButton as CompoundedComponent;

Button.Group = Group;
Button.__ANT_BUTTON = true;

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

export default Button;
