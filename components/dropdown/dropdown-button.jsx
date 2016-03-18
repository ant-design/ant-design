import React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;
import classNames from 'classnames';

export default class DropdownButton extends React.Component {
  render() {
    const { type, overlay, trigger, align, children, className, ...restProps } = this.props;
    const cls = classNames({
      'ant-dropdown-button': true,
      className: !!className,
    });
    return (
      <ButtonGroup {...restProps} className={cls}>
        <Button type={type}>{children}</Button>
        <Dropdown align={align} overlay={overlay} trigger={trigger}>
          <Button type={type}>
            <Icon type="down" />
          </Button>
        </Dropdown>
      </ButtonGroup>
    );
  }
}

DropdownButton.defaultProps = {
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
