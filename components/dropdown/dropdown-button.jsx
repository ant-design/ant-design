import React from 'react';
import Button from '../button';
import Icon from '../icon';
import Dropdown from './dropdown';
const ButtonGroup = Button.Group;

const align = {
  points: ['tr', 'br'],
  overlay: {
    adjustX: 1,
    adjustY: 1,
  },
  offset: [0, 3],
  targetOffset: [0, 0],
};

export default React.createClass({
  getDefaultProps() {
    return {
      align: align,
      type: 'default',
    };
  },
  render() {
    return <ButtonGroup className="ant-dropdown-button">
      <Button type={this.props.type}>
        {this.props.children}
      </Button>
      <Dropdown {...this.props}>
        <Button type={this.props.type}>
          <Icon type="down" />
        </Button>
      </Dropdown>
    </ButtonGroup>;
  }
});
