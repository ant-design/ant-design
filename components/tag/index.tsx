import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';
import CloseOutlined from '@ant-design/icons/CloseOutlined';

import CheckableTag from './CheckableTag';
import { ConfigConsumerProps, ConfigContext } from '../config-provider';
import {
  PresetColorTypes,
  PresetStatusColorTypes,
  PresetColorType,
  PresetStatusColorType,
} from '../_util/colors';
import Wave from '../_util/wave';
import { LiteralUnion } from '../_util/type';

export { CheckableTagProps } from './CheckableTag';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  prefixCls?: string;
  className?: string;
  color?: LiteralUnion<PresetColorType | PresetStatusColorType, string>;
  closable?: boolean;
  visible?: boolean;
  onClose?: Function;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

const PresetColorRegex = new RegExp(`^(${PresetColorTypes.join('|')})(-inverse)?$`);
const PresetStatusColorRegex = new RegExp(`^(${PresetStatusColorTypes.join('|')})$`);

export interface TagType
  extends React.ForwardRefExoticComponent<TagProps & React.RefAttributes<HTMLElement>> {
  CheckableTag: typeof CheckableTag;
}

const InternalTag: React.ForwardRefRenderFunction<unknown, TagProps> = (props, ref) => {
  const configProps = React.useContext(ConfigContext);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if ('visible' in props) {
      setVisible(props.visible!);
    }
  }, [props.visible]);

  const isPresetColor = (): boolean => {
    const { color } = props;
    if (!color) {
      return false;
    }
    return PresetColorRegex.test(color) || PresetStatusColorRegex.test(color);
  };

  const getTagStyle = () => {
    const { color, style } = props;
    return {
      backgroundColor: color && !isPresetColor() ? color : undefined,
      ...style,
    };
  };

  const getTagClassName = ({ getPrefixCls, direction }: ConfigConsumerProps) => {
    const { prefixCls: customizePrefixCls, className, color } = props;
    const presetColor = isPresetColor();
    const prefixCls = getPrefixCls('tag', customizePrefixCls);
    return classNames(
      prefixCls,
      {
        [`${prefixCls}-${color}`]: presetColor,
        [`${prefixCls}-has-color`]: color && !presetColor,
        [`${prefixCls}-hidden`]: !visible,
        [`${prefixCls}-rtl`]: direction === 'rtl',
      },
      className,
    );
  };

  const handleIconClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { onClose } = props;
    if (onClose) {
      onClose(e);
    }

    if (e.defaultPrevented) {
      return;
    }
    if (!('visible' in props)) {
      setVisible(false);
    }
  };

  const renderCloseIcon = () => {
    const { closable } = props;
    return closable ? <CloseOutlined onClick={handleIconClick} /> : null;
  };

  const { children, icon, ...otherProps } = props;
  const isNeedWave =
    'onClick' in otherProps || (children && (children as React.ReactElement<any>).type === 'a');
  const tagProps = omit(otherProps, ['onClose', 'color', 'visible', 'closable', 'prefixCls']);
  const iconNode = icon || null;
  const kids = iconNode ? (
    <>
      {iconNode}
      <span>{children}</span>
    </>
  ) : (
    children
  );

  return isNeedWave ? (
    <Wave>
      <span {...tagProps} ref={ref} className={getTagClassName(configProps)} style={getTagStyle()}>
        {kids}
        {renderCloseIcon()}
      </span>
    </Wave>
  ) : (
    <span {...tagProps} ref={ref} className={getTagClassName(configProps)} style={getTagStyle()}>
      {kids}
      {renderCloseIcon()}
    </span>
  );
};

const Tag = React.forwardRef<unknown, TagProps>(InternalTag) as TagType;

Tag.displayName = 'Tag';

Tag.defaultProps = {
  closable: false,
};

Tag.CheckableTag = CheckableTag;

export default Tag;
