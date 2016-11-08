import React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface DropdownButtonProps {
  type?: 'primary' | 'ghost' | 'dash';
  onClick?: React.FormEventHandler<any>;
  trigger?: 'click' | 'hover';
  overlay: React.ReactNode;
  visible?: boolean;
  disabled?: boolean;
  onVisibleChange?: (visible: boolean) => void;
  style?: React.CSSProperties;
  prefixCls?: string;
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
    const [{ type, overlay, trigger, align, children, className, onClick, prefixCls, disabled }, restProps] =
     splitObject(this.props,
       ['type', 'overlay', 'trigger', 'align', 'children', 'className', 'onClick', 'prefixCls', 'disabled']);
    const cls = classNames({
      [prefixCls]: true,
      [className]: !!className,
    });
    return (
      <ButtonGroup {...restProps} className={cls}>
        <Button type={type} onClick={onClick} disabled={disabled}>{children}</Button>
        <Dropdown align={align} overlay={overlay} trigger={disabled ? [] : trigger}>
          <Button type={type} disabled={disabled}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
