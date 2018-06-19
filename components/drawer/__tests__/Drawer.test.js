import React from 'react';
import { mount } from 'enzyme';
import Drawer from '..';

jest.mock('rc-util/lib/Portal');

class DrawerTester extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  componentDidMount() {
    this.setState({ visible: true }); // eslint-disable-line react/no-did-mount-set-state
  }
  saveContainer = (container) => {
    this.container = container;
  }
  getContainer = () => {
    return 'DrawerTester';
  }
  render() {
    return (
      <div>
        <div id="DrawerTester" />
        <Drawer
          {...this.props}
          visible={this.state.visible}
          getContainer={this.getContainer}
        >
          Here is content of Drawer
        </Drawer>
      </div>
    );
  }
}

describe('Drawer', () => {
  it('render correctly', () => {
    const wrapper = mount(<DrawerTester />);
    expect(wrapper.render()).toMatchSnapshot();
  });
});
