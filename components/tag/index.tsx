import * as React from 'react';
import omit from '@rc-component/util/lib/omit';
import classNames from 'classnames';

import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { isPresetColor, isPresetStatusColor } from '../_util/colors';
import type { ClosableType } from '../_util/hooks/useClosable';
import useClosable, { pickClosable } from '../_util/hooks/useClosable';
import { replaceElement } from '../_util/reactNode';
import type { LiteralUnion } from '../_util/type';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import CheckableTag from './CheckableTag';
import useStyle from './style';
import PresetCmp from './style/presetCmp';
import StatusCmp from './style/statusCmp';
import DisabledContext from '../config-provider/DisabledContext';

export type { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  /** Advised to use closeIcon instead. */
  closable?: ClosableType;
  closeIcon?: React.ReactNode;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  bordered?: boolean;
  href?: string;
  target?: string;
  disabled?: boolean;
}

const InternalTag = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, TagProps>(
  (tagProps, ref) => {
    const {
      prefixCls: customizePrefixCls,
      className,
      rootClassName,
      style,
      children,
      icon,
      color,
      onClose,
      bordered = true,
      disabled: customDisabled,
      href,
      target,
      ...props
    } = tagProps;

    // ===================== Disabled =====================
    const disabled = React.useContext(DisabledContext);
    const mergedDisabled = customDisabled ?? disabled;

    const { getPrefixCls, direction, tag: tagContext } = React.useContext(ConfigContext);
    const [visible, setVisible] = React.useState(true);

    const domProps = omit(props, ['closeIcon', 'closable']);

    const isPreset = isPresetColor(color);
    const isStatus = isPresetStatusColor(color);
    const isInternalColor = isPreset || isStatus;

    const tagStyle: React.CSSProperties = {
      backgroundColor: color && !isInternalColor ? color : undefined,
      ...tagContext?.style,
      ...style,
    };

    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    const [wrapCSSVar, hashId, cssVarCls] = useStyle(prefixCls);
    // Style
    const tagClassName = classNames(
      prefixCls,
      tagContext?.className,
      {
        [`${prefixCls}-${color}`]: isInternalColor,
        [`${prefixCls}-has-color`]: color && !isInternalColor,
        [`${prefixCls}-hidden`]: !visible,
        [`${prefixCls}-rtl`]: direction === 'rtl',
        [`${prefixCls}-borderless`]: !bordered,
        [`${prefixCls}-disabled`]: mergedDisabled,
      },
      className,
      rootClassName,
      hashId,
      cssVarCls,
    );

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

    const [, mergedCloseIcon] = useClosable(pickClosable(tagProps), pickClosable(tagContext), {
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
          className: classNames(originProps?.className, `${prefixCls}-close-icon`),
        }));
      },
    });

    const isNeedWave =
      typeof props.onClick === 'function' ||
      (children && (children as React.ReactElement<any>).type === 'a');

    const iconNode: React.ReactNode = icon || null;

    const child: React.ReactNode = iconNode ? (
      <>
        {iconNode}
        {children && <span>{children}</span>}
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

    return wrapCSSVar(isNeedWave ? <Wave component="Tag">{tagNode}</Wave> : tagNode);
  },
);

export type TagType = typeof InternalTag & {
  CheckableTag: typeof CheckableTag;
};

const Tag = InternalTag as TagType;

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

Tag.CheckableTag = CheckableTag;

export default Tag;
