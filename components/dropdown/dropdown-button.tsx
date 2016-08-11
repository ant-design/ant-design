import * as React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';
import splitObject from '../_util/splitObject';

export interface DropdownButtonProps {
  /**  按钮类型*/
  type?: 'primary' | 'ghost' | 'dash';
  /** 点击左侧按钮的回调*/
  onClick?: React.FormEventHandler;
  /** 触发下拉的行为*/
  trigger?: 'click' | 'hover';
  /** 菜单节点*/
  overlay: React.ReactNode;

  visible?: boolean;

  onVisibleChange?: (visible: boolean) => void;

  style?: React.CSSProperties;
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
  };

  render() {
    const [{ type, overlay, trigger, align, children, className, onClick }, restProps] = splitObject(this.props,
      ['type', 'overlay', 'trigger', 'align', 'children', 'className', 'onClick']);
    const cls = classNames({
      'ant-dropdown-button': true,
      [className]: !!className,
    });
    return (
      <ButtonGroup {...restProps} className={cls}>
        <Button type={type} onClick={onClick}>{children}</Button>
        <Dropdown align={align} overlay={overlay} trigger={trigger}>
          <Button type={type}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}
