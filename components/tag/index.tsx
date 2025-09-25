import * as React from 'react';
import { omit } from '@rc-component/util';
import classnames from 'classnames';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import type { ClosableType } from '../_util/hooks/useClosable';
import useClosable, { pickClosable } from '../_util/hooks/useClosable';
import useMergeSemantic from '../_util/hooks/useMergeSemantic';
import { cloneElement, replaceElement } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import { devUseWarning } from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import { useComponentConfig } from '../config-provider/context';
import DisabledContext from '../config-provider/DisabledContext';
import CheckableTag from './CheckableTag';
import CheckableTagGroup from './CheckableTagGroup';
import useColor from './hooks/useColor';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';

export type { CheckableTagProps } from './CheckableTag';
export type { CheckableTagGroupProps } from './CheckableTagGroup';

type SemanticName = 'root' | 'icon' | 'content';
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
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
  classNames?: Partial<Record<SemanticName, string>>;
  styles?: Partial<Record<SemanticName, React.CSSProperties>>;
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
      variant,
      onClose,
      bordered,
      disabled: customDisabled,
      href,
      target,
      styles,
      classNames,
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

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const { tag: tagContext } = React.useContext(ConfigContext);
    const [visible, setVisible] = React.useState(true);

    const domProps = omit(restProps, ['closeIcon', 'closable']);

    // ====================== Styles ======================
    const [mergedClassNames, mergedStyles] = useMergeSemantic(
      [contextClassNames, classNames],
      [contextStyles, styles],
    );

    const tagStyle = React.useMemo(() => {
      let nextTagStyle: React.CSSProperties = {
        ...mergedStyles.root,
        ...contextStyle,
        ...style,
      };

      if (!mergedDisabled) {
        nextTagStyle = {
          ...customTagStyle,
          ...nextTagStyle,
        };
      }

      return nextTagStyle;
    }, [mergedStyles.root, contextStyle, style, customTagStyle, mergedDisabled]);

    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const [hashId, cssVarCls] = useStyle(prefixCls);

    const tagClassName = classnames(
      prefixCls,
      contextClassName,
      mergedClassNames.root,
      `${prefixCls}-${mergedVariant}`,
      {
        [`${prefixCls}-${mergedColor}`]: isInternalColor,
        [`${prefixCls}-hidden`]: !visible,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-disabled`]: mergedDisabled,
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
          className: classnames(originProps?.className, `${prefixCls}-close-icon`),
        }));
      },
    });

    // ====================== Render ======================
    const isNeedWave =
      typeof restProps.onClick === 'function' ||
      (children && (children as React.ReactElement<any>).type === 'a');

    const iconNode: React.ReactNode = cloneElement(icon, {
      className: classnames(
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
