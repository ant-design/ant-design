import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import * as React from 'react';
import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { isPresetColor, isPresetStatusColor } from '../_util/colors';
import type { LiteralUnion } from '../_util/type';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import { ConfigContext } from '../config-provider';
import CheckableTag from './CheckableTag';
import useStyle from './style';

export type { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  rootClassName?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType>;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  /** @deprecated `visible` will be removed in next major version. */
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  bordered?: boolean;
}

export interface TagType
  extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>> {
  CheckableTag: typeof CheckableTag;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (tagProps, ref) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    style,
    children,
    icon,
    color,
    onClose,
    closeIcon,
    closable = false,
    bordered = true,
    ...props
  } = tagProps;
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const [visible, setVisible] = React.useState(true);

  // Warning for deprecated usage
  if (process.env.NODE_ENV !== 'production') {
    warning(
      !('visible' in props),
      'Tag',
      '`visible` is deprecated, please use `visible && <Tag />` instead.',
    );
  }

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  const isInternalColor = isPresetColor(color) || isPresetStatusColor(color);

  const tagStyle: React.CSSProperties = {
    backgroundColor: color && !isInternalColor ? color : undefined,
    ...style,
  };

  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const tagClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${color}`]: isInternalColor,
      [`${prefixCls}-has-color`]: color && !isInternalColor,
      [`${prefixCls}-hidden`]: !visible,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-borderless`]: !bordered,
    },
    className,
    rootClassName,
    hashId,
  );

  const handleCloseClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);

    if (e.defaultPrevented) {
      return;
    }
    setVisible(false);
  };

  const closeIconNode = React.useMemo<React.ReactNode>(() => {
    if (closable) {
      return closeIcon ? (
        <span className={`${prefixCls}-close-icon`} onClick={handleCloseClick}>
          {closeIcon}
        </span>
      ) : (
        <CloseOutlined className={`${prefixCls}-close-icon`} onClick={handleCloseClick} />
      );
    }
    return null;
  }, [closable, closeIcon, prefixCls, handleCloseClick]);

  const isNeedWave =
    typeof props.onClick === 'function' ||
    (children && (children as React.ReactElement<any>).type === 'a');

  const iconNode = icon || null;

  const kids = iconNode ? (
    <>
      {iconNode}
      <span>{children}</span>
    </>
  ) : (
    children
  );

  const tagNode = (
    <span {...props} ref={ref} className={tagClassName} style={tagStyle}>
      {kids}
      {closeIconNode}
    </span>
  );

  return wrapSSR(isNeedWave ? <Wave>{tagNode}</Wave> : tagNode);
};

const Tag = React.forwardRef<HTMLSpanElement, TagProps>(InternalTag) as TagType;

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

Tag.CheckableTag = CheckableTag;

export default Tag;
