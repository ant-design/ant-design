import React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';

export interface DropdownButtonProps {
  prefixCls?: string;
  className?: string;
  type?: 'primary' | 'ghost' | 'dashed';
  onClick?: React.MouseEventHandler<any>;
  trigger?: ('click' | 'hover')[];
  align?: any;
  overlay: React.ReactNode;
  visible?: boolean;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  children?: any;
}

export default class DropdownButton extends React.Component<DropdownButtonProps, any> {
  static defaultProps = {
    align: {
      points: ['tr', 'br'],
      overlay: {
        adjustX: 1,
        adjustY: 1,
      },
      offset: [0, 4],
      targetOffset: [0, 0],
    },
    type: 'default',
    prefixCls: 'ant-dropdown-button',
  };

  render() {
    const {
      type, overlay, trigger, align, children, className, onClick, prefixCls,
      disabled, visible, onVisibleChange, ...restProps,
    } = this.props;
    const cls = classNames(prefixCls, className);

    const dropdownProps = {
      align,
      overlay,
      trigger: disabled ? [] : trigger,
      onVisibleChange,
    };

    if ('visible' in this.props) {
      (dropdownProps as any).visible = visible;
    }

    return (
      <ButtonGroup {...restProps} className={cls}>
        <Button type={type} onClick={onClick} disabled={disabled}>{children}</Button>
        <Dropdown {...dropdownProps}>
          <Button type={type} disabled={disabled}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
