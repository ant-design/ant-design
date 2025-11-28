import * as React from 'react';
import { omit } from '@rc-component/util';
import { clsx } from 'clsx';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { pickClosable, useClosable, useMergeSemantic } from '../_util/hooks';
import type { ClosableType, SemanticClassNamesType, SemanticStylesType } from '../_util/hooks';
import { cloneElement, replaceElement } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import useSize from '../config-provider/hooks/useSize';
import type { SizeType } from '../config-provider/SizeContext';
import CheckableTag from './CheckableTag';
import CheckableTagGroup from './CheckableTagGroup';
import useColor from './hooks/useColor';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';

export type { CheckableTagProps } from './CheckableTag';
export type { CheckableTagGroupProps } from './CheckableTagGroup';

export type TagSemanticName = 'root' | 'icon' | 'content';

export type TagClassNamesType = SemanticClassNamesType<TagProps, TagSemanticName>;
export type TagStylesType = SemanticStylesType<TagProps, TagSemanticName>;

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  /**
   * @since 5.27.0
   */
  size?: SizeType;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  variant?: 'filled' | 'solid' | 'outlined';
  /** Advised to use closeIcon instead. */
  closable?: ClosableType;
  closeIcon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  /** @deprecated Please use `variant="filled"` instead */
  bordered?: boolean;
  href?: string;
  target?: string;
  disabled?: boolean;
  classNames?: TagClassNamesType;
  styles?: TagStylesType;
}

const InternalTag = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, TagProps>(
  (props, ref) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      children,
      icon,
      color,
      variant: _variant,
      onClose,
      bordered,
      disabled: customDisabled,
      href,
      target,
      styles,
      classNames,
      size: customizeSize,
      ...restProps
    } = props;

    const {
      getPrefixCls,
      direction,
      className: contextClassName,
      variant: contextVariant,
      style: contextStyle,
      classNames: contextClassNames,
      styles: contextStyles,
    } = useComponentConfig('tag');

    // ===================== Warnings =====================
    if (process.env.NODE_ENV !== 'production') {
      const warning = devUseWarning('Tag');
      warning.deprecated(bordered !== false, 'bordered={false}', 'variant="filled"');
      warning.deprecated(!color?.endsWith('-inverse'), 'color="xxx-inverse"', 'variant="solid"');
    }

    // ====================== Colors ======================
    const [mergedVariant, mergedColor, isPreset, isStatus, customTagStyle] = useColor(
      props,
      contextVariant,
    );

    const isInternalColor = isPreset || isStatus;

    const sizeClassNameMap: Record<NonNullable<SizeType>, string | undefined> = {
      large: 'lg',
      small: 'sm',
      middle: undefined, // default size
    };

    const sizeFullName = useSize((ctxSize) => customizeSize ?? ctxSize ?? 'middle');

    const sizeCls = sizeClassNameMap[sizeFullName];

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const { tag: tagContext } = React.useContext(ConfigContext);
    const [visible, setVisible] = React.useState(true);

    const domProps = omit(restProps, ['closeIcon', 'closable']);

    // =========== Merged Props for Semantic ===========
    const mergedProps: TagProps = {
      ...props,
      color: mergedColor,
      variant: mergedVariant,
      disabled: mergedDisabled,
      href,
      target,
      icon,
    };

    // ====================== Styles ======================
    const [mergedClassNames, mergedStyles] = useMergeSemantic<
      TagClassNamesType,
      TagStylesType,
      TagProps
    >([contextClassNames, classNames], [contextStyles, styles], {
      props: mergedProps,
    });

    const tagStyle = React.useMemo(() => {
      let nextTagStyle: React.CSSProperties = { ...mergedStyles.root, ...contextStyle, ...style };

      if (!mergedDisabled) {
        nextTagStyle = { ...customTagStyle, ...nextTagStyle };
      }

      return nextTagStyle;
    }, [mergedStyles.root, contextStyle, style, customTagStyle, mergedDisabled]);

    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const [hashId, cssVarCls] = useStyle(prefixCls);

    const tagClassName = clsx(
      prefixCls,
      contextClassName,
      mergedClassNames.root,
      `${prefixCls}-${mergedVariant}`,
      {
        [`${prefixCls}-${mergedColor}`]: isInternalColor,
        [`${prefixCls}-hidden`]: !visible,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-disabled`]: mergedDisabled,
        [`${prefixCls}-${sizeCls}`]: sizeCls,
      },
      className,
      rootClassName,
      hashId,
      cssVarCls,
    );

    // ===================== Closable =====================
    const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
      if (mergedDisabled) {
        return;
      }
      e.stopPropagation();
      onClose?.(e);

      if (e.defaultPrevented) {
        return;
      }
      setVisible(false);
    };

    const [, mergedCloseIcon] = useClosable(pickClosable(props), pickClosable(tagContext), {
      closable: false,
      closeIconRender: (iconNode: React.ReactNode) => {
        const replacement = (
          <span className={`${prefixCls}-close-icon`} onClick={handleCloseClick}>
            {iconNode}
          </span>
        );
        return replaceElement(iconNode, replacement, (originProps) => ({
          onClick: (e: React.MouseEvent<HTMLElement>) => {
            originProps?.onClick?.(e);
            handleCloseClick(e);
          },
          className: clsx(originProps?.className, `${prefixCls}-close-icon`),
        }));
      },
    });

    // ====================== Render ======================
    const isNeedWave =
      typeof restProps.onClick === 'function' ||
      (children && (children as React.ReactElement<any>).type === 'a');

    const iconNode: React.ReactNode = cloneElement(icon, {
      className: clsx(
        React.isValidElement(icon)
          ? (icon as React.ReactElement<{ className?: string }>).props?.className
          : '',
        mergedClassNames.icon,
      ),
      style: mergedStyles.icon,
    });

    const child: React.ReactNode = iconNode ? (
      <>
        {iconNode}
        {children && (
          <span className={mergedClassNames.content} style={mergedStyles.content}>
            {children}
          </span>
        )}
      </>
    ) : (
      children
    );

    const TagWrapper = href ? 'a' : 'span';

    const tagNode: React.ReactNode = (
      <TagWrapper
        {...domProps}
        // @ts-expect-error
        ref={ref}
        className={tagClassName}
        style={tagStyle}
        href={mergedDisabled ? undefined : href}
        target={target}
        onClick={mergedDisabled ? undefined : domProps.onClick}
        {...(href && mergedDisabled ? { 'aria-disabled': true } : {})}
      >
        {child}
        {mergedCloseIcon}
        {isPreset && <PresetCmp key="preset" prefixCls={prefixCls} />}
        {isStatus && <StatusCmp key="status" prefixCls={prefixCls} />}
      </TagWrapper>
    );

    return isNeedWave ? <Wave component="Tag">{tagNode}</Wave> : tagNode;
  },
);

export type TagType = typeof InternalTag & {
  CheckableTag: typeof CheckableTag;
  CheckableTagGroup: typeof CheckableTagGroup;
};

const Tag = InternalTag as TagType;

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

Tag.CheckableTag = CheckableTag;
Tag.CheckableTagGroup = CheckableTagGroup;

export default Tag;
