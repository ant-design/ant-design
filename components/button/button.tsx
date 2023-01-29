/* eslint-disable react/button-has-type */
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import * as React from 'react';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import { useCompactItemContext } from '../space/Compact';
import Group, { GroupSizeContext } from './button-group';
import { isTwoCNChar, isUnBorderedButtonType, spaceChildren } from './buttonHelpers';
import LoadingIcon from './LoadingIcon';
import useStyle from './style';

import type { ButtonType, ButtonHTMLType, ButtonShape } from './buttonHelpers';
import type { SizeType } from '../config-provider/SizeContext';

export type LegacyButtonType = ButtonType | 'danger';

export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}

export interface BaseButtonProps {
  type?: ButtonType;
  icon?: React.ReactNode;
  shape?: ButtonShape;
  size?: SizeType;
  disabled?: boolean;
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement>, 'type' | 'onClick'>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'>;

export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;

type CompoundedComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLElement>
> & {
  Group: typeof Group;
  /** @internal */
  __ANT_BUTTON: boolean;
};

type Loading = number | boolean;

const InternalButton: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    danger,
    shape = 'default',
    size: customizeSize,
    disabled: customDisabled,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = 'button',
    ...rest
  } = props;

  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(ConfigContext);
  const prefixCls = getPrefixCls('btn', customizePrefixCls);

  const [wrapSSR, hashId] = useStyle(prefixCls);

  const size = React.useContext(SizeContext);
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled ?? disabled;

  const groupSize = React.useContext(GroupSizeContext);
  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const buttonRef = (ref as any) || React.createRef<HTMLAnchorElement | HTMLButtonElement>();

  const isNeedInserted = () =>
    React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);

  const fixTwoCNChar = () => {
    // FIXME: for HOC usage like <FormatMessage />
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  const loadingOrDelay: Loading = typeof loading === 'boolean' ? loading : loading?.delay || true;

  React.useEffect(() => {
    let delayTimer: number | null = null;

    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }

    function cleanupTimer() {
      if (delayTimer) {
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    }

    return cleanupTimer;
  }, [loadingOrDelay]);

  React.useEffect(fixTwoCNChar, [buttonRef]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    // FIXME: https://github.com/ant-design/ant-design/issues/30207
    if (innerLoading || mergedDisabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Button',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

  warning(
    !(ghost && isUnBorderedButtonType(type)),
    'Button',
    "`link` or `text` button can't be a `ghost` button.",
  );

  const autoInsertSpace = autoInsertSpaceInButton !== false;
  const { compactSize, compactItemClassnames } = useCompactItemContext(prefixCls, direction);

  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  const sizeFullname = compactSize || groupSize || customizeSize || size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

  const iconType = innerLoading ? 'loading' : icon;

  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate']);

  const hrefAndDisabled = linkButtonRestProps.href !== undefined && mergedDisabled;

  const classes = classNames(
    prefixCls,
    hashId,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace && !innerLoading,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-dangerous`]: !!danger,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-disabled`]: hrefAndDisabled,
    },
    compactItemClassnames,
    className,
  );

  const iconNode =
    icon && !innerLoading ? (
      icon
    ) : (
      <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
    );

  const kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;

  if (linkButtonRestProps.href !== undefined) {
    return wrapSSR(
      <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>,
    );
  }

  let buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={mergedDisabled}
      ref={buttonRef}
    >
      {iconNode}
      {kids}
    </button>
  );

  if (!isUnBorderedButtonType(type)) {
    buttonNode = <Wave disabled={!!innerLoading}>{buttonNode}</Wave>;
  }

  return wrapSSR(buttonNode);
};

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  InternalButton,
) as CompoundedComponent;

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

Button.Group = Group;
Button.__ANT_BUTTON = true;

export default Button;
