import CloseOutlined from '@ant-design/icons/CloseOutlined';
import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import type { PresetColorType, PresetStatusColorType } from '../_util/colors';
import { PresetColorTypes, PresetStatusColorTypes } from '../_util/colors';
import Wave from '../_util/wave';
import warning from '../_util/warning';
import CheckableTag from './CheckableTag';
import useStyle from './style';
import type { LiteralUnion } from '../_util/type';

export type { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  /** @deprecated `visible` will be removed in next major version. */
  visible?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);

export interface TagType
  extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>> {
  CheckableTag: typeof CheckableTag;
}

const InternalTag: React.ForwardRefRenderFunction<HTMLSpanElement, TagProps> = (
  {
    prefixCls: customizePrefixCls,
    className,
    style,
    children,
    icon,
    color,
    onClose,
    closeIcon,
    closable = false,
    ...props
  },
  ref,
) => {
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

  const isPresetColor = (): boolean => {
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
  };

  const tagStyle = {
    backgroundColor: color && !isPresetColor() ? color : undefined,
    ...style,
  };

  const presetColor = isPresetColor();
  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const tagClassName = classNames(
    prefixCls,
    {
      [`${prefixCls}-${color}`]: presetColor,
      [`${prefixCls}-has-color`]: color && !presetColor,
      [`${prefixCls}-hidden`]: !visible,
      [`${prefixCls}-rtl`]: direction === 'rtl',
    },
    className,
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

  const renderCloseIcon = () => {
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
  };

  const isNeedWave =
    'onClick' in props || (children && (children as React.ReactElement<any>).type === 'a');
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
      {renderCloseIcon()}
    </span>
  );

  return wrapSSR(isNeedWave ? <Wave>{tagNode}</Wave> : tagNode);
};

const Tag = React.forwardRef<unknown, TagProps>(InternalTag) as TagType;

if (process.env.NODE_ENV !== 'production') {
  Tag.displayName = 'Tag';
}

Tag.CheckableTag = CheckableTag;

export default Tag;
