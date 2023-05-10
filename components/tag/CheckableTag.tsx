import classNames from 'classnames';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import useStyle from './style';

export interface CheckableTagProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  /**
   * It is an absolute controlled component and has no uncontrolled mode.
   *
   * .zh-cn 该组件为完全受控组件，不支持非受控用法。
   */
  checked: boolean;
  children?: React.ReactNode;
  onChange?: (checked: boolean) => void;
  onClick?: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

const CheckableTag: React.FC<CheckableTagProps> = (props) => {
  const {
    prefixCls: customizePrefixCls,
    className,
    checked,
    onChange,
    onClick,
    ...restProps
  } = props;
  const { getPrefixCls } = React.useContext(ConfigContext);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    onChange?.(!checked);
    onClick?.(e);
  };

  const prefixCls = getPrefixCls('tag', customizePrefixCls);
  // Style
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const cls = classNames(
    prefixCls,
    {
      [`${prefixCls}-checkable`]: true,
      [`${prefixCls}-checkable-checked`]: checked,
    },
    className,
    hashId,
  );

  return wrapSSR(<span {...restProps} className={cls} onClick={handleClick} />);
};

export default CheckableTag;
